terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "us-west-2"
}

data "archive_file" "lambda_issues_tracker" {
  type = "zip"

  source_dir  = "${path.module}./server"
  output_path = "${path.module}/server.zip"
}

resource "aws_s3_object" "lambda_issues_tracker" {
  bucket = aws_s3_bucket.lambda_bucket.id

  key    = "issues-tracker.zip"
  source = data.archive_file.lambda_issues_tracker.output_path

  etag = filemd5(data.archive_file.lambda_issues_tracker.output_path)
}

resource "aws_s3_bucket" "lambda_bucket" {
  bucket        = "issuestrackerbucket"
  force_destroy = true
}

resource "aws_lambda_function" "issues_tracker" {
  function_name = "IssuesTracker"

  s3_bucket = aws_s3_bucket.lambda_bucket.id
  s3_key    = aws_s3_object.lambda_issues_tracker.key

  runtime = "nodejs18.x"
  handler = "issuesTracker.handler"

  source_code_hash = data.archive_file.lambda_issues_tracker.output_base64sha256

  role = aws_iam_role.lambda_exec.arn
}

resource "aws_cloudwatch_log_group" "issues_tracker" {
  name = "/aws/lambda/${aws_lambda_function.issues_tracker.function_name}"

  retention_in_days = 30
}

resource "aws_dynamodb_table" "UserAuth" {
  name           = "UserAuth"
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "Username"

  attribute {
    name = "Username"
    type = "S"
  }
}

resource "aws_dynamodb_table" "Issues" {
  name           = "Issues"
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "Email"
  range_key = "TicketId"

  attribute {
    name = "Email"
    type = "S"
  }

  attribute {
    name = "TicketId"
    type = "S"
  }

  attribute {
    name = "TicketStatus"
    type = "S"
  }

  attribute {
    name = "IssueType"
    type = "S"
  }

  global_secondary_index {
    name               = "Issue-Type-Index"
    hash_key           = "IssueType"
    write_capacity     = 1
    read_capacity      = 1
    projection_type    = "INCLUDE"
    non_key_attributes = ["Genre"]
  }

  global_secondary_index {
    name               = "TicketStatus-Index"
    hash_key           = "TicketStatus"
    write_capacity     = 1
    read_capacity      = 1
    projection_type    = "INCLUDE"
    non_key_attributes = ["Genre"]
  }

  tags = {
    Name        = "issues-tracker-table"
    Environment = "dev"
  }
}

resource "aws_iam_policy" "dynamoDBLambdaPolicy" {
  name = "DynamoDBLambdaPolicy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:DeleteItem",
          "dynamodb:UpdateItem",
          "dynamodb:Scan",  
          "dynamodb:Query"
        ]
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_role" "lambda_exec" {
  name = "serverless_lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Sid    = ""
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  for_each = toset([
    "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
    aws_iam_policy.dynamoDBLambdaPolicy.arn
  ])
  role       = aws_iam_role.lambda_exec.name
  policy_arn = each.value
}

resource "aws_apigatewayv2_api" "lambda" {
  name          = "serverless_lambda_gw"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "lambda" {
  api_id = aws_apigatewayv2_api.lambda.id

  name        = "serverless_lambda_stage"
  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gw.arn

    format = jsonencode({
      requestId               = "$context.requestId"
      sourceIp                = "$context.identity.sourceIp"
      requestTime             = "$context.requestTime"
      protocol                = "$context.protocol"
      httpMethod              = "$context.httpMethod"
      resourcePath            = "$context.resourcePath"
      routeKey                = "$context.routeKey"
      status                  = "$context.status"
      responseLength          = "$context.responseLength"
      integrationErrorMessage = "$context.integrationErrorMessage"
      }
    )
  }
}

resource "aws_apigatewayv2_integration" "issues_tracker" {
  api_id = aws_apigatewayv2_api.lambda.id

  integration_uri    = aws_lambda_function.issues_tracker.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "issues_tracker" {
  api_id = aws_apigatewayv2_api.lambda.id

  route_key = "$default"
  target    = "integrations/${aws_apigatewayv2_integration.issues_tracker.id}"
}

resource "aws_cloudwatch_log_group" "api_gw" {
  name = "/aws/api_gw/${aws_apigatewayv2_api.lambda.name}"

  retention_in_days = 30
}

resource "aws_lambda_permission" "api_gw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.issues_tracker.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.lambda.execution_arn}/*/*"
}

