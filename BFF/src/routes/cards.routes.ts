import { Router, Request, Response } from 'express';
import Card from '../models/Card.model';
import Board from '../models/Board.model';
import mongoose from 'mongoose';

const router = Router();

// GET /api/cards/:boardId - Obtener todas las cards de un board
router.get('/:boardId', async (req: Request, res: Response) => {
  try {
    const { boardId } = req.params;
    const { status, priority } = req.query;

    // Validar que el boardId sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(boardId)) {
      return res.status(400).json({
        success: false,
        message: 'ID de board inválido'
      });
    }

    // Verificar que el board existe
    const boardExists = await Board.findById(boardId);
    if (!boardExists) {
      return res.status(404).json({
        success: false,
        message: 'Board no encontrado'
      });
    }

    // Construir filtros
    const filters: any = { boardId };
    
    if (status) {
      filters.status = status;
    }
    
    if (priority) {
      filters.priority = priority;
    }

    const cards = await Card.find(filters)
      .sort({ createdAt: -1 })
      .select('_id title status priority assignedTo dueDate tags createdAt updatedAt');
    
    res.json({
      success: true,
      boardId,
      boardName: boardExists.name,
      count: cards.length,
      data: cards.map(card => ({
        id: card._id,
        title: card.title,
        status: card.status,
        priority: card.priority,
        assignedTo: card.assignedTo,
        dueDate: card.dueDate,
        tags: card.tags,
        createdAt: card.createdAt,
        updatedAt: card.updatedAt
      }))
    });
  } catch (error) {
    console.error('Error al obtener cards:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener cards',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// GET /api/card/details/:cardId - Obtener detalles específicos de una card
router.get('/details/:cardId', async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;

    // Validar que el cardId sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(cardId)) {
      return res.status(400).json({
        success: false,
        message: 'ID de card inválido'
      });
    }

    const card = await Card.findById(cardId).populate('boardId', 'name color');
    
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card no encontrada'
      });
    }
    
    res.json({
      success: true,
      data: {
        id: card._id,
        title: card.title,
        description: card.description,
        status: card.status,
        priority: card.priority,
        assignedTo: card.assignedTo,
        dueDate: card.dueDate,
        tags: card.tags,
        board: {
          id: (card.boardId as any)._id,
          name: (card.boardId as any).name,
          color: (card.boardId as any).color
        },
        createdAt: card.createdAt,
        updatedAt: card.updatedAt
      }
    });
  } catch (error) {
    console.error('Error al obtener detalles de la card:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener detalles de la card',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

export default router;

