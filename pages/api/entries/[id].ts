import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../../database';
import { Entry, IMEntry } from '../../../models';

type Data = { message: string } | IMEntry;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'PUT':
			return updateEntry(req, res);

		case 'GET':
			return getEntryById(req, res);

		case 'DELETE':
			return deleteEntryById(req, res);

		default:
			return res
				.status(400)
				.json({ message: `El metodo ${req.method} no esta habilitado` });
	}
}

/**
 * Funciones
 */

// PUT /api/entries/[id]
const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { id } = req.query;

	try {
		await db.connect();

		const entrada = await Entry.findById(id);

		if (!entrada) {
			await db.disconnect();
			const error = new Error('Entrada no encontrada');

			return res.status(404).json({ message: error.message });
		}

		// Actualización
		// descripcion = valor enviado en el body || valor de la base de datos
		// const descripcion = req.body.descripcion || entrada.descripcion;
		const { descripcion = entrada.descripcion, status = entrada.status } = req.body;

		const entradaActualizada = await Entry.findByIdAndUpdate(
			id,
			{ descripcion, status },
			{ new: true, runValidators: true }
		);

		await entrada.save();
		await db.disconnect();

		return res.status(201).json(entradaActualizada!);
	} catch (error: any) {
		await db.disconnect();
		// Personalizando error
		if (error.name === 'ValidationError') {
			if (error.errors.descripcion) {
				const { message } = error.errors.descripcion;
				return res.status(400).json({ message });
			}

			if (error.errors.status) {
				const { message } = error.errors.status;
				return res.status(400).json({ message });
			}
		}

		console.log(error);
		return res.status(500).json({ message: 'Revise logs del servidor' });
	}
};

// GET /api/entries/[id]
const getEntryById = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { id } = req.query;

	try {
		await db.connect();
		const entrada = await Entry.findById(id);
		await db.disconnect();

		if (!entrada) {
			const error = new Error(`Entrada id:${id} - no encontrada`);

			return res.status(401).json({ message: error.message });
		}

		return res.status(200).json(entrada);
	} catch (error) {
		await db.disconnect();
		console.log(error);
		return res.status(500).json({ message: 'Revise logs del servidor' });
	}
};

// DELETE /api/entries/[id]
const deleteEntryById = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { id } = req.query;

	try {
		await db.connect();

		await Entry.findByIdAndDelete(id);

		await db.disconnect();

		return res.status(200).json({ message: 'Entrada borrada correctamente' });
	} catch (error) {
		await db.disconnect();
		console.log(error);
		return res.status(500).json({ message: 'Revise logs del servidor' });
	}
};
