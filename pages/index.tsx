import { NextPage } from 'next';

import { Layout } from '../components/layout';
import { EntryList, NewEntry } from '../components/ui';

const HomePage: NextPage = () => {
	return (
		<Layout titulo='Home OpenJira'>
			<div className='container flex-1 grid md:grid-cols-3 gap-4 py-8'>
				<div className='bg-slate-700  max-h-[610px] rounded-md p-4'>
					<div className='flex flex-col h-full overflow-y-auto'>
						<h3 className='text-center mb-4'>Pendientes</h3>

						<NewEntry />

						<EntryList status='pendiente' />
					</div>
				</div>

				<div className='bg-slate-700 h-full rounded-md p-4'>
					<div className='flex flex-col h-full overflow-y-auto'>
						<h3 className='text-center mb-4'>En Progreso</h3>

						<EntryList status='en-progreso' />
					</div>
				</div>

				<div className='bg-slate-700 h-full rounded-md p-4'>
					<div className='flex flex-col h-full overflow-y-auto'>
						<h3 className='text-center mb-4'>Completadas</h3>

						<EntryList status='completada' />
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default HomePage;
