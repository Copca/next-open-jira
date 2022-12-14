import { createContext } from 'react';

import { IEntry } from '../../interfaces';

interface ContextProps {
	// State
	entries: IEntry[];

	// Metodos
	guardarEntrada: (description: string) => void;
	actualizarEntrada: (entry: IEntry, mostrarAlerta?: boolean) => void;
	borrarEntrada: (id: string) => void;
}

export const EntriesContext = createContext({} as ContextProps);
