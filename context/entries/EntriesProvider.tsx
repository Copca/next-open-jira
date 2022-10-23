import { FC, PropsWithChildren, useReducer } from 'react';

import { EntriesContext, entriesReducer } from './';
import { generarId } from '../../utils';
import { IEntry } from '../../interfaces';

export interface EntriesState {
	entries: IEntry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
	entries: [
		{
			_id: generarId(),
			descripcion:
				'Pendiente: Fugiat occaecat aute nostrud adipisicing cupidatat mollit commodo ea dolore nisi.',
			status: 'pendiente',
			createdAt: Date.now()
		},
		{
			_id: generarId(),
			descripcion:
				'En Proceso: Qui pariatur nostrud adipisicing nulla mollit consectetur culpa eiusmod ullamco qui cupidatat ad.',
			status: 'en progreso',
			createdAt: Date.now() - 1000000
		},
		{
			_id: generarId(),
			descripcion:
				'Completada: Ullamco sunt ipsum laboris anim non sint deserunt non pariatur sint sunt.',
			status: 'completada',
			createdAt: Date.now() - 100000
		}
	]
};

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

	const guardarEntrada = (descripcion: string) => {
		const nuevaEntrada: IEntry = {
			_id: generarId(),
			descripcion,
			createdAt: Date.now(),
			status: 'pendiente'
		};

		dispatch({ type: '[Entries] - Guardar Entrada', payload: nuevaEntrada });
	};

	const actualizarEntrada = (entry: IEntry) => {
		dispatch({ type: '[Entries] - Actualizar', payload: entry });
	};

	return (
		<EntriesContext.Provider
			value={{
				// State
				...state,

				// Metodos
				guardarEntrada,
				actualizarEntrada
			}}
		>
			{children}
		</EntriesContext.Provider>
	);
};
