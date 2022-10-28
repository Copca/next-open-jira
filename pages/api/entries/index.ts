import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../../database';
import { Entry, IMEntry } from '../../../models';

type Data = { message: string } | IMEntry[] | IMEntry;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'GET':
			return getEntries(res);

		case 'POST':
			return postEntry(req, res);

		default:
			return res.status(400).json({ message: 'Endpoint no válido' });
	}
}

/**
 * Funciones
 */

// GET api/entries Obtiene todas las Entradas
const getEntries = async (res: NextApiResponse<Data>) => {
	try {
		await db.connect();
		const entries = await Entry.find().sort({ createdAt: 'asc' });
		await db.disconnect();

		return res.status(200).json(entries);
	} catch (error) {
		console.log(error);
		await db.disconnect();

		return res.status(500).json({ message: 'Revise logs del servidor' });
	}
};

// POST api/entries  Crea una Entrada
const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { descripcion = '' } = req.body;

	// no se recomienda usar new Entry(req.body) por seguridad ya que pudieran sobre escribir algun campo
	const nuevaEntrada = new Entry({
		descripcion,
		createdAt: Date.now()
	});

	try {
		await db.connect();
		await nuevaEntrada.save();
		await db.disconnect();

		return res.status(201).json(nuevaEntrada);
	} catch (error: any) {
		await db.disconnect();

		// Personalizando error
		if (error.name === 'ValidationError') {
			if (error.errors['descripcion']) {
				const message = error.errors['descripcion'].message;
				return res.status(400).json({ message });
			}
		}

		console.log(error);

		return res.status(500).json({ message: 'Revise logs del servidor' });
	}
};
