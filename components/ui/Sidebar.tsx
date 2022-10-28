import { MdClose, MdInbox, MdStars, MdEmail, MdDrafts } from 'react-icons/md';

export const Sidebar = () => {
	return (
		<aside className='flex space-x-2'>
			<div>
				{/* <button
					className='inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg  focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
					type='button'
					data-bs-toggle='offcanvas'
					data-bs-target='#offcanvasExample'
					aria-controls='offcanvasExample'
				>
					Button with data-bs-target
				</button> */}

				{/* Canvas */}
				<div
					className='offcanvas offcanvas-start fixed bottom-0 flex flex-col max-w-full bg-gray-600 invisible bg-clip-padding shadow-sm outline-none transition duration-300 ease-in-out text-white top-0 left-0 border-none w-64'
					tabIndex={1}
					id='offcanvasExample'
					aria-labelledby='offcanvasExampleLabel'
				>
					<div className='offcanvas-header flex items-center justify-between p-4'>
						<h5
							className='offcanvas-title mb-0 leading-normal font-semibold'
							id='offcanvasExampleLabel'
						>
							Menú
						</h5>

						<button
							type='button'
							data-bs-dismiss='offcanvas'
							aria-label='Close'
						>
							<MdClose className='text-white text-2xl font-bold hover:text-gray-400 transition-colors' />
						</button>
					</div>

					<div className='offcanvas-body flex-grow p-4 overflow-y-auto divide-y space-y-4'>
						<ul className='space-y-4'>
							<li className='flex items-center gap-2'>
								{<MdInbox />} Inbox
							</li>
							<li className='flex items-center gap-2'>
								{<MdStars />} Starred
							</li>
							<li className='flex items-center gap-2'>
								{<MdEmail />} Email
							</li>
							<li className='flex items-center gap-2'>
								{<MdDrafts />} Draft
							</li>
						</ul>

						<ul className='space-y-4 pt-4'>
							<li className='flex items-center gap-2'>
								{<MdInbox />} Inbox
							</li>
							<li className='flex items-center gap-2'>
								{<MdStars />} Starred
							</li>
							<li className='flex items-center gap-2'>
								{<MdEmail />} Email
							</li>
							<li className='flex items-center gap-2'>
								{<MdDrafts />} Draft
							</li>
						</ul>
					</div>
				</div>
			</div>
		</aside>
	);
};
