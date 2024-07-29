export const createSignInResponseObj = (response: any) => ({
        token: response.body.jwtToken,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email: response.body.results.Items[0].Username },
})