import { NextRequest, NextResponse } from 'next/server'
import { NextFunction } from './handler';

// export const config = {
//   matcher: '/auth/cb-hook',
// }

const webhookUser = process.env.CORBADO_WEBHOOK_USERNAME;
const webhookPass = process.env.CORBADO_WEBHOOK_PASSWORD;

export async function middleware(request: NextRequest, next: NextFunction): Promise<NextResponse | void> {
  
  const basicAuth = request.headers.get('authorization')
  const url = request.nextUrl
  console.log('i was called');
  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, pwd] = atob(authValue).split(':')
    console.log(user, pwd);
    if (user === webhookUser && pwd === webhookPass) {
      return next();
    }
  }

  return NextResponse.json({
    data: {
      status: "not_exists"
    }
  }, {
    status: 401
  });
}