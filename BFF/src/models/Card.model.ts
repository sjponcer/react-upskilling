import mongoose, { Document, Schema } from 'mongoose';

export interface ICard extends Document {
  _id: string;
  boardId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
  dueDate?: Date;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const CardSchema: Schema = new Schema(
  {
    boardId: {
      type: Schema.Types.ObjectId,
      ref: 'Board',
      required: [true, 'El board ID es requerido'],
      index: true
    },
    title: {
      type: String,
      required: [true, 'El título de la card es requerido'],
      trim: true,
      maxlength: [200, 'El título no puede exceder 200 caracteres']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, 'La descripción no puede exceder 2000 caracteres']
    },
    status: {
      type: String,
      enum: ['todo', 'in-progress', 'done'],
      default: 'todo'
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    assignedTo: {
      type: String,
      trim: true
    },
    dueDate: {
      type: Date
    },
    tags: [{
      type: String,
      trim: true
    }]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Índices para búsquedas más rápidas
CardSchema.index({ boardId: 1, status: 1 });
CardSchema.index({ boardId: 1, createdAt: -1 });

export default mongoose.model<ICard>('Card', CardSchema);

