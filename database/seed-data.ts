// Este tipado es opcional
interface ISeedData {
	entries: ISeedEntry[];
}

interface ISeedEntry {
	descripcion: string;
	status: string;
	createdAt: number;
}

export const seedData: ISeedData = {
	entries: [
		{
			descripcion:
				'Pendiente: Fugiat occaecat aute nostrud adipisicing cupidatat mollit commodo ea dolore nisi.',
			status: 'pendiente',
			createdAt: Date.now()
		},
		{
			descripcion:
				'En Proceso: Qui pariatur nostrud adipisicing nulla mollit consectetur culpa eiusmod ullamco qui cupidatat ad.',
			status: 'en-progreso',
			createdAt: Date.now() - 1000000
		},
		{
			descripcion:
				'Completada: Ullamco sunt ipsum laboris anim non sint deserunt non pariatur sint sunt.',
			status: 'completada',
			createdAt: Date.now() - 100000
		}
	]
};
