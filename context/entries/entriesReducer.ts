import { EntriesState } from './';
import { IEntry } from '../../interfaces';

type EntriesActionType =
	| { type: '[Entries] - Cargar Entradas'; payload: IEntry[] }
	| { type: '[Entries] - Guardar Entrada'; payload: IEntry }
	| { type: '[Entries] - Actualizar'; payload: IEntry }
	| { type: '[Entries] - Borrar Entrada'; payload: string };

export const entriesReducer = (
	state: EntriesState,
	action: EntriesActionType
): EntriesState => {
	switch (action.type) {
		case '[Entries] - Cargar Entradas':
			return {
				entries: [...action.payload]
			};

		case '[Entries] - Guardar Entrada':
			return {
				...state,
				entries: [...state.entries, action.payload]
			};

		case '[Entries] - Actualizar':
			return {
				...state,
				entries: state.entries.map((entryState) =>
					entryState._id === action.payload._id ? action.payload : entryState
				)
			};

		case '[Entries] - Borrar Entrada':
			return {
				...state,
				entries: state.entries.filter((entry) => entry._id !== action.payload)
			};

		default:
			return state;
	}
};
