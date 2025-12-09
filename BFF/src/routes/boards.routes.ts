import { Router, Request, Response } from 'express';
import Board from '../models/Board.model';
import Card from '../models/Card.model';
import mongoose from 'mongoose';

const router = Router();

// GET /api/boards - Obtener todos los boards (nombre e id)
router.get('/', async (req: Request, res: Response) => {
  try {
    const boards = await Board.find()
      .select('_id name color')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: boards.length,
      data: boards.map(board => ({
        id: board._id,
        name: board.name,
        color: board.color
      }))
    });
  } catch (error) {
    console.error('Error al obtener boards:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener boards',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// POST /api/boards - Crear un nuevo board
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description, color } = req.body;

    // Validaciones
    if (!name || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'El nombre del board es requerido'
      });
    }

    // Crear el board
    const newBoard = await Board.create({
      name: name.trim(),
      description: description?.trim(),
      color: color || '#0079bf'
    });

    res.status(201).json({
      success: true,
      message: 'Board creado exitosamente',
      data: {
        id: newBoard._id,
        name: newBoard.name,
        description: newBoard.description,
        color: newBoard.color,
        createdAt: newBoard.createdAt
      }
    });
  } catch (error) {
    console.error('Error al crear board:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear board',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// GET /api/boards/:id - Obtener un board específico con detalles
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const board = await Board.findById(id);
    
    if (!board) {
      return res.status(404).json({
        success: false,
        message: 'Board no encontrado'
      });
    }

    // Contar cards por estado
    const cardsCount = await Card.aggregate([
      { $match: { boardId: board._id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const stats = {
      todo: 0,
      'in-progress': 0,
      done: 0
    };

    cardsCount.forEach(item => {
      stats[item._id as keyof typeof stats] = item.count;
    });
    
    res.json({
      success: true,
      data: {
        id: board._id,
        name: board.name,
        description: board.description,
        color: board.color,
        createdAt: board.createdAt,
        stats,
        totalCards: Object.values(stats).reduce((a, b) => a + b, 0)
      }
    });
  } catch (error) {
    console.error('Error al obtener board:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener board',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// PUT /api/boards/:id - Actualizar un board
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, color } = req.body;

    // Validar ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID de board inválido'
      });
    }

    // Construir objeto de actualización
    const updateData: any = {};
    if (name !== undefined) updateData.name = name.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (color !== undefined) updateData.color = color;

    const updatedBoard = await Board.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedBoard) {
      return res.status(404).json({
        success: false,
        message: 'Board no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Board actualizado exitosamente',
      data: {
        id: updatedBoard._id,
        name: updatedBoard.name,
        description: updatedBoard.description,
        color: updatedBoard.color,
        updatedAt: updatedBoard.updatedAt
      }
    });
  } catch (error) {
    console.error('Error al actualizar board:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar board',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// DELETE /api/boards/:id - Eliminar un board y sus cards
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validar ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID de board inválido'
      });
    }

    const board = await Board.findById(id);
    if (!board) {
      return res.status(404).json({
        success: false,
        message: 'Board no encontrado'
      });
    }

    // Eliminar todas las cards del board
    const cardsDeleted = await Card.deleteMany({ boardId: id });
    
    // Eliminar el board
    await Board.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Board y sus cards eliminados exitosamente',
      data: {
        boardId: id,
        cardsDeleted: cardsDeleted.deletedCount
      }
    });
  } catch (error) {
    console.error('Error al eliminar board:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar board',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

export default router;

