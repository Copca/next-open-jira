import { FC, PropsWithChildren } from 'react';
import Head from 'next/head';

import { Navbar, Sidebar } from '../ui';

interface Props {
	titulo?: string;
}

export const Layout: FC<PropsWithChildren<Props>> = ({
	children,
	titulo = 'OpenJira'
}) => {
	return (
		<div className='min-h-screen bg-slate-800 text-white flex flex-col'>
			<Head>
				<title>{titulo}</title>
			</Head>

			<Navbar />

			{/* Sidebar */}
			<Sidebar />

			<>{children}</>
		</div>
	);
};
