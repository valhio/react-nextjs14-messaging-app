import withAuth from "next-auth/middleware"

export default withAuth({ // Sets the default redirect for when a user is not signed in 
    pages: {
        signIn: '/', 
    }
})

export const config = { // This will redirect the user to the sign in page if they are not signed in
    matcher: [
        "/users/:path*",
        "/conversations/:path*",
    ]
}