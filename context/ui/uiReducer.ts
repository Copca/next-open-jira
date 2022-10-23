import { UiState } from './';

type UiActionType =
	| { type: '[Ui] - Mostrar Formulario'; payload: boolean }
	| { type: '[Ui] - Inicio Draggin' }
	| { type: '[Ui] - Fin Dragging' };

export const uiReducer = (state: UiState, action: UiActionType): UiState => {
	switch (action.type) {
		case '[Ui] - Mostrar Formulario':
			return {
				...state,
				mostrarFormulario: action.payload
			};

		case '[Ui] - Inicio Draggin':
			return {
				...state,
				isDragging: true
			};

		case '[Ui] - Fin Dragging':
			return {
				...state,
				isDragging: false
			};

		default:
			return state;
	}
};
