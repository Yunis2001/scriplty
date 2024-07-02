/**
 * An Array of routes that will only be accessible to the public not requiring authentication.
 * These routes will be accessible by default by non-authorized users i.e the public.
 * @type {string[]}
 */
export const publicRoutes = [
    "/"
]

/**
 * An Array of routes that represent the auth routes.
 * These routes will be accessible by default to the public and will be used to authenticate users to the protected routes.
 * @type {string[]}
 */
export const authRoutes = [
    "/register",
    "/login",
]

/**
 * This is represents the prefix for the API authentication routes
 * These routes are used for API authentication purposes and are to be public.
 * @type {string[]}
 */
export const apiAuthPrefixs = ["/api/auth/providers","/api/add-user"]


/**
 * After logging in or signing up this will be the default page the user will be redirected to.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT_URL = "/dashboard"