import { EntriesState } from './';
import { IEntry } from '../../interfaces';

type EntriesActionType =
	| { type: '[Entries] - Guardar Entrada'; payload: IEntry }
	| { type: '[Entries] - Actualizar'; payload: IEntry };

export const entriesReducer = (
	state: EntriesState,
	action: EntriesActionType
): EntriesState => {
	switch (action.type) {
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

		default:
			return state;
	}
};
