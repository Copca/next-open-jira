import { createContext } from 'react';

interface ContextProps {
	// State
	mostrarFormulario: boolean;
	isDragging: boolean;

	// Metodos
	setMostrarFormulario: (value: boolean) => void;

	inicioDragging: () => void;
	finDragging: () => void;
}

export const UiContext = createContext({} as ContextProps);
