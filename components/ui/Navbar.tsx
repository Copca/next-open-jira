import { FiMenu } from 'react-icons/fi';

export const Navbar = () => {
	return (
		<div className='flex items-center gap-4 bg-violet-900 py-4 px-8'>
			<button
				data-bs-toggle='offcanvas'
				data-bs-target='#offcanvasExample'
				aria-controls='offcanvasExample'
			>
				<FiMenu />
			</button>

			<h1>OpenJira</h1>
		</div>
	);
};
