var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
require('dotenv').config();
var AWS = require('aws-sdk');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var docClient = new AWS.DynamoDB.DocumentClient();
var jwtSecret = process.env.JWT_SECRET;
module.exports.handler = function (event) { return __awaiter(_this, void 0, void 0, function () {
    var response, _a, TableName, Item, Username, Password, salt, hashPassword, newPayload, _b, Payload, payloadPassword, newPayload, userResults, username, hashPassword, passwordCheck, jwtToken, _c, _d, deletePromises, _e, _f, _g, _h, err_1;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                console.log('Event: ', event);
                response = {
                    statusCode: 200,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: {
                        message: 'Successfully created item!',
                        results: { Items: [] }
                    },
                };
                _j.label = 1;
            case 1:
                _j.trys.push([1, 24, , 25]);
                if (!(event.Payload.TableName === 'UserAuth')) return [3 /*break*/, 8];
                if (!(event.Method === 'Put')) return [3 /*break*/, 5];
                _a = event.Payload, TableName = _a.TableName, Item = _a.Item;
                Username = Item.Username, Password = Item.Password;
                return [4 /*yield*/, bcrypt.genSalt()];
            case 2:
                salt = _j.sent();
                return [4 /*yield*/, bcrypt.hash(Password, salt)];
            case 3:
                hashPassword = _j.sent();
                newPayload = { TableName: TableName, Item: { Username: Username, Password: hashPassword } };
                _b = response.body;
                return [4 /*yield*/, docClient.put(newPayload).promise()];
            case 4:
                _b.results = _j.sent();
                _j.label = 5;
            case 5:
                if (!(event.Method === 'Get')) return [3 /*break*/, 8];
                console.log('in Get event:', event);
                Payload = event.Payload;
                payloadPassword = Payload.ExpressionAttributeValues[':password'];
                newPayload = {
                    TableName: 'UserAuth',
                    KeyConditionExpression: 'Username=:username',
                    ExpressionAttributeValues: {
                        ':username': Payload.ExpressionAttributeValues[':username']
                    }
                };
                return [4 /*yield*/, docClient.query(newPayload).promise()];
            case 6:
                userResults = _j.sent();
                username = userResults.Items[0].Username;
                hashPassword = userResults.Items[0].Password;
                return [4 /*yield*/, bcrypt.compare(payloadPassword, hashPassword)];
            case 7:
                passwordCheck = _j.sent();
                if (passwordCheck) {
                    jwtToken = jwt.sign({ username: username, hashPassword: hashPassword }, jwtSecret);
                    response.body.jwtToken = jwtToken;
                    response.body.results = userResults;
                }
                else {
                    return [2 /*return*/, {
                            statusCode: 401,
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: {
                                message: 'can not find user',
                                results: []
                            },
                        }];
                }
                _j.label = 8;
            case 8:
                if (!(event.Payload.TableName === 'Issues')) return [3 /*break*/, 23];
                if (!(event.Method === 'Scan')) return [3 /*break*/, 10];
                _c = response.body;
                return [4 /*yield*/, docClient.scan(event.Payload).promise()];
            case 9:
                _c.results = _j.sent();
                _j.label = 10;
            case 10:
                if (!(event.Method === 'Query')) return [3 /*break*/, 12];
                _d = response.body;
                return [4 /*yield*/, docClient.query(event.Payload).promise()];
            case 11:
                _d.results = _j.sent();
                _j.label = 12;
            case 12:
                if (!((event === null || event === void 0 ? void 0 : event.Method) === 'Delete')) return [3 /*break*/, 17];
                if (!Array.isArray(event.Payload.Key.TicketId)) return [3 /*break*/, 14];
                deletePromises = event.Payload.Key.TicketId.map(function (item) {
                    var params = {
                        TableName: event.Payload.TableName,
                        Key: {
                            Email: event.Payload.Key.Email,
                            TicketId: item
                        }
                    };
                    return docClient.delete(params).promise();
                });
                return [4 /*yield*/, Promise.all(deletePromises)];
            case 13:
                _j.sent();
                response.body.message = 'Successfully deleted items!';
                return [3 /*break*/, 16];
            case 14:
                _e = response.body;
                return [4 /*yield*/, docClient.delete(event.Payload).promise()];
            case 15:
                _e.results = _j.sent();
                _j.label = 16;
            case 16: return [3 /*break*/, 23];
            case 17:
                if (!((event === null || event === void 0 ? void 0 : event.Method) === 'Put')) return [3 /*break*/, 19];
                _f = response.body;
                return [4 /*yield*/, docClient.put(event.Payload).promise()];
            case 18:
                _f.results = _j.sent();
                return [3 /*break*/, 23];
            case 19:
                if (!((event === null || event === void 0 ? void 0 : event.Method) === 'Update')) return [3 /*break*/, 21];
                _g = response.body;
                return [4 /*yield*/, docClient.update(event.Payload).promise()];
            case 20:
                _g.results = _j.sent();
                return [3 /*break*/, 23];
            case 21:
                if (!((event === null || event === void 0 ? void 0 : event.Method) === 'Get')) return [3 /*break*/, 23];
                _h = response.body;
                return [4 /*yield*/, docClient.get(event.Payload).promise()];
            case 22:
                _h.results = _j.sent();
                _j.label = 23;
            case 23:
                console.log('DB results!!:', response.body.results);
                return [2 /*return*/, response];
            case 24:
                err_1 = _j.sent();
                console.log(err_1);
                return [3 /*break*/, 25];
            case 25: return [2 /*return*/];
        }
    });
}); };
