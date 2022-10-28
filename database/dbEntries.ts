import { isValidObjectId } from 'mongoose';

import { db } from '.';
import { Entry, IMEntry } from '../models';

export const getEntry = async (id: string): Promise<IMEntry | null> => {
	if (!isValidObjectId(id)) return null;

	await db.connect();
	const entry = await Entry.findById(id).lean(); // .lean -> manda información minima
	await db.disconnect();

	// Tenemos que serianlizar el ID de Mongo para evitar errores
	return JSON.parse(JSON.stringify(entry));
};
