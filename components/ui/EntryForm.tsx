import {
	ChangeEvent,
	useRef,
	useState,
	SyntheticEvent,
	FC,
	useEffect,
	useContext
} from 'react';
import { useRouter } from 'next/router';
import { BiSave } from 'react-icons/bi';

import { EntriesContext } from '../../context/entries';
import { useAutosizeTextArea } from '../../hooks';
import { EntryStatus, IEntry } from '../../interfaces';
import { dateFunctions } from '../../utils';

interface Props {
	entry: IEntry;
}

export const EntryForm: FC<Props> = ({ entry }) => {
	const router = useRouter();
	const { actualizarEntrada } = useContext(EntriesContext);
	const [error, setError] = useState(false);
	const [inputValue, setInputValue] = useState(entry.descripcion);
	const [status, setStatus] = useState<EntryStatus>(entry.status);
	const [btnDisable, setBtnDisable] = useState(true);

	// Auto ajustar altura del textarea
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	useAutosizeTextArea(textAreaRef.current, inputValue);

	// Habilita o desabilita el boton y el error
	useEffect(() => {
		if (inputValue.length !== 0) {
			setBtnDisable(false);
			setError(false);
		} else {
			setBtnDisable(true);
			setError(true);
		}
	}, [inputValue]);

	const onChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target?.value;
		setInputValue(value);
	};

	const onSubmit = (e: SyntheticEvent) => {
		e.preventDefault();

		// Validadión del formulario
		if (inputValue.trim().length === 0) {
			setError(true);
			return;
		}

		setError(false);

		const entryActulizada: IEntry = {
			...entry,
			descripcion: inputValue,
			status
		};

		actualizarEntrada(entryActulizada, true);

		router.push('/');
	};

	return (
		<form
			className='container max-w-md bg-slate-700 rounded p-5 mt-20'
			noValidate
			onSubmit={onSubmit}
		>
			<h2>Entrada: </h2>

			<p className='mb-8'>
				Creada hace: {dateFunctions.getFormatDistanceToNow(entry.createdAt)}
			</p>
			<div id='text-area-input'>
				<div className='form-floating text-area'>
					<textarea
						ref={textAreaRef}
						onChange={onChangeTextArea}
						value={inputValue}
						autoFocus
						rows={1}
						required
						className={`form-control block w-full px-3 py-1.5 rounded transition ease-in-out m-0 text-gray-700 outline-none !shadow-none ring-4 focus:ring-sky-600  ${
							error ? 'ring-red-500' : ''
						}`}
						placeholder='placeholder'
					></textarea>

					<label htmlFor='floatingInput' className='text-gray-600'>
						Descripción
					</label>
				</div>
				<div
					className={`text-sm mb-4 my-1 ${
						error ? 'text-red-600 font-bold' : 'text-transparent'
					}`}
				>
					Ingrese un valor
				</div>
			</div>

			<div className='flex justify-center gap-4 mb-4'>
				<div className='form-check-input'>
					<input
						type='radio'
						id='pendiente'
						name='status'
						value={'pendiente'}
						className='form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-violet-600 checked:border-violet-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
						checked={status === 'pendiente' ? true : false}
						onChange={(e) => setStatus(e.target.value as EntryStatus)}
					/>
					<label
						htmlFor='pendiente'
						className='form-check-label inline-block text-slate-100'
					>
						Pendiente
					</label>
				</div>

				<div className='form-check-input'>
					<input
						type='radio'
						id='progreso'
						name='status'
						value={'en-progreso'}
						className='form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-violet-600 checked:border-violet-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
						checked={status === 'en-progreso' ? true : false}
						onChange={(e) => setStatus(e.target.value as EntryStatus)}
					/>
					<label
						htmlFor='progreso'
						className='form-check-label inline-block text-slate-100'
					>
						Progreso
					</label>
				</div>

				<div className='form-check-input'>
					<input
						type='radio'
						id='completada'
						name='status'
						value={'completada'}
						className='form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-violet-600 checked:border-violet-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
						checked={status === 'completada' ? true : false}
						onChange={(e) => setStatus(e.target.value as EntryStatus)}
					/>
					<label
						htmlFor='completada'
						className='form-check-label inline-block text-slate-100'
					>
						Completada
					</label>
				</div>
			</div>

			<button
				type={'submit'}
				data-mdb-ripple='true'
				data-mdb-ripple-color='light'
				className={`flex justify-center items-center gap-1 px-6 py-3 border-2 border-teal-600 text-teal-600 font-medium text-xs leading-tight uppercase rounded hover:bg-teal-600 hover:bg-opacity-20 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-full disabled:opacity-20 disabled:cursor-not-allowed`}
				disabled={btnDisable}
			>
				<BiSave className='text-xl' />
				Guardar
			</button>
		</form>
	);
};
