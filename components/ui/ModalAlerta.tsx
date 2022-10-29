import { useContext } from 'react';
import { useRouter } from 'next/router';

import { EntriesContext } from '../../context/entries';

export const ModalAlerta = () => {
	const router = useRouter();
	const { borrarEntrada } = useContext(EntriesContext);

	const { id } = router.query as { id: string };

	const onClickBorrar = () => {
		borrarEntrada(id);

		router.push('/');
	};

	return (
		<div
			className='modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto'
			id='exampleModal'
			tabIndex={-1}
			aria-labelledby='exampleModalLabel'
			aria-hidden='true'
		>
			<div className='modal-dialog modal-dialog-centered relative w-auto pointer-events-none'>
				<div className='modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current'>
					{/* Modal Header */}
					<div className='modal-header flex flex-col sm:flex-row flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md'>
						<div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10 mb-2 sm:mb-0'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6 text-red-600'
								viewBox='0 0 20 20'
								fill='currentColor'
							>
								<path
									fillRule='evenodd'
									d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
									clipRule='evenodd'
								/>
							</svg>
						</div>

						<h5
							className='text-xl text-gray-800 font-bold'
							id='exampleModalLabel'
						>
							Eliminar Entrada
						</h5>

						<button
							type='button'
							className='bg-white hidden sm:block rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 '
							data-bs-dismiss='modal'
							aria-label='Close'
							// onClick={ocultarModalEliminarColaborador}
						>
							<span className='sr-only'>Cerrar</span>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6'
								viewBox='0 0 20 20'
								fill='currentColor'
							>
								<path
									fillRule='evenodd'
									d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
									clipRule='evenodd'
								/>
							</svg>
						</button>
					</div>

					{/* Modal Body */}
					<div className='flex items-start justify-center py-8'>
						<div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full'>
							<div className='mt-2'>
								<p className='text-gray-500 text-sm text-center'>
									Una vez eliminada, no es posible recuperarla
								</p>
							</div>
						</div>
					</div>

					{/* Modal Footer */}
					<div className='modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md'>
						<button
							type='button'
							className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm mb-4 sm:mb-0'
							data-bs-dismiss='modal'
							// onClick={ocultarModalEliminarColaborador}
						>
							Cancelar
						</button>

						<button
							type='button'
							className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
							data-bs-dismiss='modal'
							onClick={onClickBorrar}
						>
							Eliminar
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
