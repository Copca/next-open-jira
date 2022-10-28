import { ChangeEvent, useRef, useState, useContext } from 'react';
import { BiSave, BiPlusCircle } from 'react-icons/bi';

import { useAutosizeTextArea } from '../../hooks';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UiContext } from '../../context/ui';

export const NewEntry = () => {
	const { guardarEntrada } = useContext(EntriesContext);
	const { mostrarFormulario, setMostrarFormulario } = useContext(UiContext);
	const [inputValue, setInputValue] = useState('');
	const [error, setError] = useState(false);

	// Auto ajustar altura del textarea
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	useAutosizeTextArea(textAreaRef.current, inputValue);

	const onChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target?.value;

		setInputValue(value);
	};

	const onClickCancelar = () => {
		setMostrarFormulario(false);
		setError(false);
		setInputValue('');
	};

	const onClickGuardar = () => {
		// validar textarea
		if (inputValue.trim().length === 0) {
			setError(true);
			setInputValue('');
			return;
		}

		// resetemaos valores
		setError(false);
		setMostrarFormulario(false);
		setInputValue('');

		// enviamos inputValue al EntriesProvider
		guardarEntrada(inputValue);
	};

	return (
		<>
			{mostrarFormulario ? (
				<div className='animate-fadeIn'>
					<div className='flex justify-center '>
						<div className='w-96 form-floating text-area'>
							<textarea
								onChange={onChangeTextArea}
								ref={textAreaRef}
								rows={1}
								// value={inputValue} si queremos tener persistencia en el contenido del textarea
								autoFocus
								required
								id='exampleFormControlTextarea1'
								className={`form-control block w-full px-3 py-1.5 rounded transition ease-in-out m-0 text-gray-700 outline-none !shadow-none ring-4 focus:ring-sky-600 ${
									error ? 'ring-red-500' : ''
								}`}
								placeholder='placeholder'
							></textarea>

							<label htmlFor='floatingInput' className='text-gray-600'>
								Descripción
							</label>
						</div>
					</div>
					<div
						className={`text-sm text-gray-300 mb-4 my-1 ${
							error && 'text-red-600 font-bold'
						}`}
					>
						Ingrese un valor
					</div>

					<div className='flex justify-between mb-4'>
						<button
							type='button'
							className='block px-6 py-2 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out'
							onClick={onClickCancelar}
						>
							Cancelar
						</button>

						<button
							type='button'
							className='flex gap-1 px-6 py-2 border-2 border-teal-600 text-teal-600 font-medium text-xs leading-tight uppercase rounded hover:bg-teal-600 hover:bg-opacity-20 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'
							onClick={onClickGuardar}
						>
							<BiSave />
							Guardar
						</button>
					</div>
				</div>
			) : (
				<button
					type='button'
					className='w-full inline-flex items-center justify-center gap-2 px-6 py-2 border-2 border-sky-500 text-sky-500 font-medium text-xs leading-normal uppercase rounded hover:bg-sky-500 hover:bg-opacity-20 focus:outline-none focus:ring-0 transition duration-150 ease-in-out mb-4'
					onClick={() => setMostrarFormulario(true)}
				>
					<BiPlusCircle className='text-xl' />
					Agregar Tarea
				</button>
			)}
		</>
	);
};
