import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log(`Middleware: Here URL: ${request.url}`)
}

export const config = {
  matcher: '/home/(.*)',
}