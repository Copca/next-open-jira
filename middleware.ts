// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
	// Solo se ejecuta si la url comienza con /api/entries/
	if (req.nextUrl.pathname.startsWith('/api/entries/')) {
		// Obtenemos el ID de la url
		const id = req.nextUrl.pathname.replace('/api/entries/', '');

		// Expresión regular para verificar si es un ID de Mongo
		const checkMongoIDRegExp = new RegExp('^[0-9a-fA-F]{24}$');

		if (!checkMongoIDRegExp.test(id)) {
			// Redirecciona si no es ID de Mongo
			const url = req.nextUrl.clone();

			url.pathname = '/api/bad-request';

			// mandamos el mensaje en la url
			url.search = `?message=${id} no es ID de Mongo válido`;

			return NextResponse.rewrite(url);
		}
	}

	return NextResponse.next();
}

// See "Matching Paths" below to learn more
//  * is zero or more. ? is zero or one and + one or more
// '/((?!api|static|favicon.ico).*)',
export const config = {
	matcher: [
		// '/api/:path*'
		// '/api/entries' // SI /api/entries, NO  /api/entries/6357fcf9dc98064a1b0709ee
		// '/api/entries/:path' // SI /api/entries, NO /api/entries/6357fcf9dc98064a1b0709ee
		'/api/entries/:path*' // SI /api/entries, SI /api/entries/6357fcf9dc98064a1b0709ee
		// '/api/entries/:path?' // SI /api/entries, SI /api/entries/6357fcf9dc98064a1b0709ee
		// '/api/entries/:path+' // NO /api/entries, SI /api/entries/6357fcf9dc98064a1b0709ee
		// '/api/entries/(.*)' // NO /api/entries, SI /api/entries/6357fcf9dc98064a1b0709ee
	]
};
