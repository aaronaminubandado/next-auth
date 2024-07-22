import { redirect } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    //define public paths
    const isPublicPath = path === '/login'
                      || path === '/signup'
                      || path === '/verify';
               
    //Get the token from the cookies
    const token = request.cookies.get('token')?.value || '';

    //Redirect based on token and path presence
    if(isPublicPath && token){
        //redirect to homepage if trying to access public path with a token
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    //redirect to login if trying to access a protected page without a token
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

}

//specify paths which the middleware should be executed
export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
        '/verifyemail'
    ]
}
