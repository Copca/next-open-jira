import { FC, PropsWithChildren, useEffect, useReducer, useRef } from 'react';
import { toast } from 'react-toastify';

import { EntriesContext, entriesReducer } from './';
import { entriesApi } from '../../axios/';

import { IEntry } from '../../interfaces';

export interface EntriesState {
	entries: IEntry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
	entries: []
};

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);
	const effectRan = useRef(true); // Evitamos doble useEffect en stricMode

	// CSR - Client Side Rendering
	useEffect(() => {
		// Evitamos doble useEffect en stricMode
		if (effectRan.current) {
			const consultarApi = async () => {
				const { data } = await entriesApi.get<IEntry[]>('/entries');

				dispatch({ type: '[Entries] - Cargar Entradas', payload: data });
			};

			consultarApi();
		}

		// Ejecucion en el Desmontaje del effect
		return () => {
			effectRan.current = false;
		};
	}, []);

	/**
	 * Métodos
	 */
	const guardarEntrada = async (descripcion: string) => {
		try {
			const { data } = await entriesApi.post<IEntry>('/entries', { descripcion });

			dispatch({ type: '[Entries] - Guardar Entrada', payload: data });
		} catch (error: any) {
			console.log(error.response.data);
		}
	};

	const actualizarEntrada = async (
		{ _id, descripcion, status }: IEntry,
		mostrarAlerta = false
	) => {
		try {
			const { data } = await entriesApi.put<IEntry>(`/entries/${_id}`, {
				descripcion,
				status
			});

			// Lanzamos la notificación
			if (mostrarAlerta) {
				toast.success('Guardado Correctamente');
			}

			dispatch({ type: '[Entries] - Actualizar', payload: data });
		} catch (error: any) {
			console.log(error.response.data);
		}
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
