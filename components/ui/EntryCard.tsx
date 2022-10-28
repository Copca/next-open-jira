import { DragEvent, FC, useContext } from 'react';
import { useRouter } from 'next/router';

import { UiContext } from '../../context/ui';
import { IEntry } from '../../interfaces/entry';
import { dateFunctions } from '../../utils';

interface Props {
	entry: IEntry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
	const router = useRouter();
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
			className='bg-slate-900 hover:bg-slate-800 transition-colors p-2 rounded mb-2 cursor-pointer'
			onClick={() => router.push(`/entries/${_id}`)}
		>
			<div draggable onDragStart={onDragStart} onDragEnd={onDragEnd}>
				<p className='whitespace-pre-line mb-2'>{descripcion}</p>

				<small className='block text-right'>
					Hace: {dateFunctions.getFormatDistanceToNow(entry.createdAt)}
				</small>
			</div>
		</li>
	);
};
