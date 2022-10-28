import { FC, PropsWithChildren } from 'react';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Navbar, Sidebar } from '../ui';

interface Props {
	titulo?: string;
}

export const Layout: FC<PropsWithChildren<Props>> = ({
	children,
	titulo = 'OpenJira'
}) => {
	return (
		<div className='min-h-screen bg-slate-800 text-white flex flex-col items-center'>
			<Head>
				<title>{titulo}</title>
			</Head>

			<Navbar />

			{/* Sidebar */}
			<Sidebar />

			<>{children}</>

			<ToastContainer />
		</div>
	);
};
