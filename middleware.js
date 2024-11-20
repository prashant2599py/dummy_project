import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server'

export async function middleware(request) {
    const session = await getKindeServerSession(request);  // Ensuring session is retrieved
    const { isAuthenticated } = session;

    if (!(await isAuthenticated())) {
        return NextResponse.redirect(new URL('/api/auth/login?post_login_redirect_url=/dashboard', request.url));
    }

    return NextResponse.next();  // Continue the request if authenticated
}

export const config = {
  matcher: '/dashboard/:path*',  // Middleware is applied to /dashboard paths
}
