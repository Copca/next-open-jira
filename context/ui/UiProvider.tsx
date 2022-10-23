import { FC, PropsWithChildren, useReducer } from 'react';

import { UiContext, uiReducer } from './';

export interface UiState {
	mostrarFormulario: boolean;
	isDragging: boolean;
}

const UI_INITIAL_STATE: UiState = {
	mostrarFormulario: false,
	isDragging: false
};

export const UiProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

	const setMostrarFormulario = (value: boolean) => {
		dispatch({ type: '[Ui] - Mostrar Formulario', payload: value });
	};

	const inicioDragging = () => {
		dispatch({ type: '[Ui] - Inicio Draggin' });
	};

	const finDragging = () => {
		dispatch({ type: '[Ui] - Fin Dragging' });
	};

	return (
		<UiContext.Provider
			value={{
				// State
				...state,

				// Metodos
				setMostrarFormulario,

				inicioDragging,
				finDragging
			}}
		>
			{children}
		</UiContext.Provider>
	);
};
