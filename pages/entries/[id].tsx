// * SSR Server Side Rendering

import { GetServerSideProps, NextPage } from 'next';
import { BiTrash } from 'react-icons/bi';

import { dbEntries } from '../../database';
import { Layout } from '../../components/layout/Layout';
import { EntryForm } from '../../components/ui/EntryForm';
import { IEntry } from '../../interfaces/entry';

interface Props {
	entry: IEntry;
}

const EntryPageId: NextPage<Props> = ({ entry }) => {
	return (
		<Layout titulo={entry.descripcion.substring(0, 20) + '...'}>
			<div className='flex-1 w-full relative'>
				<EntryForm entry={entry} />

				<button
					type='button'
					data-mdb-ripple='true'
					data-mdb-ripple-color='light'
					className='absolute bottom-20 right-20 flex items-center justify-center rounded-full bg-red-500 text-white leading-normal shadow-md hover:bg-red-700 hover:shadow-lg transition duration-150 ease-in-out w-20 h-20'
				>
					<BiTrash className='text-3xl' />
				</button>
			</div>
		</Layout>
	);
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { id } = params as { id: string };

	const entry = await dbEntries.getEntry(id);

	if (!entry) {
		return {
			redirect: {
				destination: '/',
				permanent: false
				// false -> puede que en un futuro esa url si exista y pueda ser indexada
				// true -> los boots de google nunca indexarán esa url que falló,
			}
		};
	}

	return {
		props: {
			entry
		}
	};
};

export default EntryPageId;
