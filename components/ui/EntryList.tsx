import { FC, useContext, useMemo, DragEvent } from 'react';

import { EntriesContext } from '../../context/entries';
import { UiContext } from '../../context/ui';

import { EntryStatus } from '../../interfaces';
import { EntryCard } from './EntryCard';

interface Props {
	status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
	const { entries, actualizarEntrada } = useContext(EntriesContext);
	const { isDragging, finDragging } = useContext(UiContext);

	// Filtramos las entradas por status, las memorizamos ya que solo queremos que se ejecute si "entry" cambia
	// useMemo(() => first, [second])
	const entriesByStatus = useMemo(
		() => entries.filter((entry) => entry.status === status),
		[entries, status]
	);

	// Se habilita el area donde esta permitido el drop(soltar el elemento arrastrado)
	const allowDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
		const id = e.dataTransfer.getData('text');

		// Buscamos las entradas con el ID
		const entry = entries.find((entryState) => entryState._id === id)!; // con el signo "!" indicamos que nunca será undefined

		// Actualizamos el Status de la entrada
		entry.status = status;

		actualizarEntrada(entry);
		finDragging();
	};

	return (
		<div
			className={`flex-1  ${isDragging && 'bg-slate-500 border border-dashed'}`} // habilitamos el area del Drop
			onDragOver={allowDrop}
			onDrop={onDropEntry}
		>
			<ul className={isDragging ? 'opacity-50 duration-300 ease-in-out' : ''}>
				{entriesByStatus.map((entry) => (
					<EntryCard key={entry._id} entry={entry} />
				))}
			</ul>
		</div>
	);
};
