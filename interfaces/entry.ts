export interface IEntry {
	_id: string;
	descripcion: string;
	createdAt: number;
	status: EntryStatus;
}

export type EntryStatus = 'pendiente' | 'en progreso' | 'completada';
