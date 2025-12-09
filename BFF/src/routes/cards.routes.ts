import { Router, Request, Response } from 'express';
import Card from '../models/Card.model';
import Board from '../models/Board.model';
import mongoose from 'mongoose';

const router = Router();

// POST /api/cards - Crear una nueva card
router.post('/', async (req: Request, res: Response) => {
  try {
    const { boardId, title, description, status, priority, assignedTo, dueDate, tags } = req.body;

    // Validaciones
    if (!boardId) {
      return res.status(400).json({
        success: false,
        message: 'El boardId es requerido'
      });
    }

    if (!mongoose.Types.ObjectId.isValid(boardId)) {
      return res.status(400).json({
        success: false,
        message: 'ID de board inválido'
      });
    }

    if (!title || title.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'El título de la card es requerido'
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

    // Crear la card
    const newCard = await Card.create({
      boardId,
      title: title.trim(),
      description: description?.trim(),
      status: status || 'todo',
      priority: priority || 'medium',
      assignedTo: assignedTo?.trim(),
      dueDate: dueDate ? new Date(dueDate) : undefined,
      tags: tags || []
    });

    res.status(201).json({
      success: true,
      message: 'Card creada exitosamente',
      data: {
        id: newCard._id,
        boardId: newCard.boardId,
        title: newCard.title,
        description: newCard.description,
        status: newCard.status,
        priority: newCard.priority,
        assignedTo: newCard.assignedTo,
        dueDate: newCard.dueDate,
        tags: newCard.tags,
        createdAt: newCard.createdAt,
        updatedAt: newCard.updatedAt
      }
    });
  } catch (error) {
    console.error('Error al crear card:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear card',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

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

// PUT /api/cards/:cardId - Actualizar una card
router.put('/:cardId', async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;
    const { title, description, status, priority, assignedTo, dueDate, tags } = req.body;

    // Validar ObjectId
    if (!mongoose.Types.ObjectId.isValid(cardId)) {
      return res.status(400).json({
        success: false,
        message: 'ID de card inválido'
      });
    }

    // Construir objeto de actualización
    const updateData: any = {};
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (status !== undefined) updateData.status = status;
    if (priority !== undefined) updateData.priority = priority;
    if (assignedTo !== undefined) updateData.assignedTo = assignedTo.trim();
    if (dueDate !== undefined) updateData.dueDate = dueDate ? new Date(dueDate) : null;
    if (tags !== undefined) updateData.tags = tags;

    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedCard) {
      return res.status(404).json({
        success: false,
        message: 'Card no encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Card actualizada exitosamente',
      data: {
        id: updatedCard._id,
        boardId: updatedCard.boardId,
        title: updatedCard.title,
        description: updatedCard.description,
        status: updatedCard.status,
        priority: updatedCard.priority,
        assignedTo: updatedCard.assignedTo,
        dueDate: updatedCard.dueDate,
        tags: updatedCard.tags,
        updatedAt: updatedCard.updatedAt
      }
    });
  } catch (error) {
    console.error('Error al actualizar card:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar card',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// DELETE /api/cards/:cardId - Eliminar una card
router.delete('/:cardId', async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;

    // Validar ObjectId
    if (!mongoose.Types.ObjectId.isValid(cardId)) {
      return res.status(400).json({
        success: false,
        message: 'ID de card inválido'
      });
    }

    const card = await Card.findByIdAndDelete(cardId);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card no encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Card eliminada exitosamente',
      data: {
        id: card._id
      }
    });
  } catch (error) {
    console.error('Error al eliminar card:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar card',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

export default router;

