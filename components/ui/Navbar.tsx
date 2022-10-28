import { FiMenu } from 'react-icons/fi';
import Link from 'next/link';

export const Navbar = () => {
	return (
		<div className='flex items-center gap-4 bg-violet-900 py-4 px-8 w-full'>
			<button
				data-bs-toggle='offcanvas'
				data-bs-target='#offcanvasExample'
				aria-controls='offcanvasExample'
			>
				<FiMenu />
			</button>

			<Link href={'/'}>
				<h1 className='cursor-pointer'>OpenJira</h1>
			</Link>
		</div>
	);
};
