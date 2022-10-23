import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { EntriesProvider } from '../context/entries';
import { UiProvider } from '../context/ui';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<EntriesProvider>
			<UiProvider>
				<Component {...pageProps} />
			</UiProvider>
		</EntriesProvider>
	);
}

export default MyApp;
