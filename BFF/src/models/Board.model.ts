import mongoose, { Document, Schema } from 'mongoose';

export interface IBoard extends Document {
  _id: string;
  name: string;
  description?: string;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BoardSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre del board es requerido'],
      trim: true,
      maxlength: [100, 'El nombre no puede exceder 100 caracteres']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'La descripción no puede exceder 500 caracteres']
    },
    color: {
      type: String,
      default: '#0079bf',
      trim: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Índice para búsquedas más rápidas
BoardSchema.index({ name: 1 });

export default mongoose.model<IBoard>('Board', BoardSchema);

