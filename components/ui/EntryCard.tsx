import { DragEvent, FC, useContext } from 'react';

import { UiContext } from '../../context/ui';
import { IEntry } from '../../interfaces/entry';

interface Props {
	entry: IEntry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
	const { _id, descripcion } = entry;
	const { inicioDragging, finDragging } = useContext(UiContext);

	const onDragStart = (e: DragEvent<HTMLDivElement>) => {
		e.dataTransfer.setData('text', _id);

		inicioDragging();
	};

	const onDragEnd = () => {
		finDragging();
	};

	return (
		<li
			data-mdb-ripple='true'
			data-mdb-ripple-color='light'
			className='bg-slate-900 hover:bg-slate-800 transition-colors p-2 rounded mb-2'
		>
			<div draggable onDragStart={onDragStart} onDragEnd={onDragEnd}>
				<p className='whitespace-pre-line mb-2'>{descripcion}</p>

				<small className='block text-right'>Hace 30 minutos</small>
			</div>
		</li>
	);
};
