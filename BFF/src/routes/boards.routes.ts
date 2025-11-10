import { Router, Request, Response } from 'express';
import Board from '../models/Board.model';
import Card from '../models/Card.model';

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

export default router;

