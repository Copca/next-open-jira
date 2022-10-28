import mongoose, { Model, Schema } from 'mongoose';
import { IEntry } from '../interfaces';

// Extendemos IEntry por si crece el modelo, no cambiar el IEntry
export interface IMEntry extends IEntry {}

const entrySchema = new Schema({
	descripcion: {
		type: String,
		required: [true, 'La descripción es obligatoria'],
		trim: true
	},
	createdAt: {
		type: Number,
		required: [true, 'La fecha de creación es obligatoria']
	},
	status: {
		type: String,
		enum: {
			values: ['pendiente', 'en-progreso', 'completada'],
			message: '{VALUE} - no es un status permitido'
		},
		default: 'pendiente'
	}
});

// Método para personalizar los daros de respuesta JSON al frontend
entrySchema.methods.toJSON = function () {
	const { __v, ...data } = this.toObject();

	return data;
};

const EntryModel: Model<IMEntry> =
	mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default EntryModel;
