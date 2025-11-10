import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';
import boardsRouter from './routes/boards.routes';
import cardsRouter from './routes/cards.routes';

// Cargar variables de entorno
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a MongoDB
connectDB();

// Rutas
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Bienvenido a la API BFF - Boards & Cards',
    version: '2.0.0',
    database: 'MongoDB',
    endpoints: {
      boards: '/api/boards',
      boardDetails: '/api/boards/:id',
      cardsByBoard: '/api/cards/:boardId',
      cardDetails: '/api/card/details/:cardId'
    }
  });
});

// API Routes
app.use('/api/boards', boardsRouter);
app.use('/api/cards', cardsRouter);
app.use('/api/card', cardsRouter);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`\n📚 Endpoints disponibles:`);
  console.log(`   - GET  http://localhost:${PORT}/api/boards`);
  console.log(`   - GET  http://localhost:${PORT}/api/cards/:boardId`);
  console.log(`   - GET  http://localhost:${PORT}/api/card/details/:cardId`);
  console.log(`\n💡 Tip: Ejecuta 'npm run seed' para cargar datos de ejemplo\n`);
});

export default app;

