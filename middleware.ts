import NextAuth from "next-auth";
import authConfig from "./auth.config";

import {
    DEFAULT_LOGIN_REDIRECT_URL,
    publicRoutes,
    authRoutes,
    apiAuthPrefixs,
} from "@/routes"

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    // Single out the authentication api routes from requiring authorization.
    const isApiAuthRoute = apiAuthPrefixs.includes(nextUrl.pathname);

    // Single out the public routes from requiring authorization
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

    // Single out the authentication routes i.e login and register from requiring authorization.
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    /**
     * This conditional statement returns nothing when the user accesses the authentication api route
     * This will be useful in allowing users to access sign up and login option via other providers.
     */
    if (isApiAuthRoute) {
        return;
    }


    /**
     * This conditional statement redirects the user to the dashboard.
     * If the users are currently logged in and try accessing the authentication paths, they are immediately redirected to the dashboard.
     */
    if (isAuthRoute) {
        if(isLoggedIn){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_URL,nextUrl));
        }
        return;
    }

    /**
     * This conditional statement restricts unauthenticated users from accessing the dashboard.
     * Immediately an unauthorized user tries to access the dashboard they are redirected to the login page specifically.
     */
    if(!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL("/login",nextUrl));
    }

    return;
})

// Regular expression meant to not invoke the middleware on the matches.
export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}