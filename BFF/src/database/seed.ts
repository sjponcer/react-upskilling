import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Board from '../models/Board.model';
import Card from '../models/Card.model';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bff-db';

const seedDatabase = async () => {
  try {
    // Conectar a MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Limpiar colecciones existentes
    await Board.deleteMany({});
    await Card.deleteMany({});
    console.log('🧹 Colecciones limpiadas');

    // Crear boards
    const boards = await Board.insertMany([
      {
        name: 'Proyecto Web App',
        description: 'Desarrollo de la aplicación web principal',
        color: '#0079bf'
      },
      {
        name: 'Marketing Digital',
        description: 'Campañas y estrategias de marketing',
        color: '#d29034'
      },
      {
        name: 'Recursos Humanos',
        description: 'Gestión de personal y procesos internos',
        color: '#519839'
      },
      {
        name: 'Diseño UI/UX',
        description: 'Diseño de interfaces y experiencia de usuario',
        color: '#b04632'
      }
    ]);

    console.log(`📋 ${boards.length} boards creados`);

    // Crear cards para cada board
    const cards = [];

    // Cards para Proyecto Web App
    cards.push(
      {
        boardId: boards[0]._id,
        title: 'Configurar entorno de desarrollo',
        description: 'Instalar Node.js, VS Code y extensiones necesarias',
        status: 'done',
        priority: 'high',
        assignedTo: 'Juan Pérez',
        tags: ['setup', 'development']
      },
      {
        boardId: boards[0]._id,
        title: 'Diseñar base de datos',
        description: 'Crear esquema de base de datos con MongoDB',
        status: 'done',
        priority: 'high',
        assignedTo: 'María García',
        tags: ['database', 'mongodb']
      },
      {
        boardId: boards[0]._id,
        title: 'Implementar autenticación',
        description: 'Sistema de login con JWT y refresh tokens',
        status: 'in-progress',
        priority: 'high',
        assignedTo: 'Carlos López',
        dueDate: new Date('2024-12-15'),
        tags: ['security', 'auth']
      },
      {
        boardId: boards[0]._id,
        title: 'Crear API REST',
        description: 'Endpoints para CRUD de usuarios y contenido',
        status: 'in-progress',
        priority: 'high',
        assignedTo: 'Juan Pérez',
        dueDate: new Date('2024-12-20'),
        tags: ['api', 'backend']
      },
      {
        boardId: boards[0]._id,
        title: 'Testing unitario',
        description: 'Escribir tests con Jest para los módulos principales',
        status: 'todo',
        priority: 'medium',
        tags: ['testing', 'quality']
      }
    );

    // Cards para Marketing Digital
    cards.push(
      {
        boardId: boards[1]._id,
        title: 'Análisis de competencia',
        description: 'Investigar estrategias de la competencia',
        status: 'done',
        priority: 'medium',
        assignedTo: 'Ana Martínez',
        tags: ['research', 'analysis']
      },
      {
        boardId: boards[1]._id,
        title: 'Campaña en redes sociales',
        description: 'Planificar contenido para Instagram y LinkedIn',
        status: 'in-progress',
        priority: 'high',
        assignedTo: 'Luis Rodríguez',
        dueDate: new Date('2024-12-10'),
        tags: ['social-media', 'content']
      },
      {
        boardId: boards[1]._id,
        title: 'Email marketing',
        description: 'Diseñar newsletter mensual',
        status: 'todo',
        priority: 'medium',
        assignedTo: 'Ana Martínez',
        tags: ['email', 'newsletter']
      },
      {
        boardId: boards[1]._id,
        title: 'Analítica web',
        description: 'Configurar Google Analytics 4',
        status: 'todo',
        priority: 'low',
        tags: ['analytics', 'tracking']
      }
    );

    // Cards para Recursos Humanos
    cards.push(
      {
        boardId: boards[2]._id,
        title: 'Proceso de onboarding',
        description: 'Documentar proceso de incorporación de nuevos empleados',
        status: 'in-progress',
        priority: 'high',
        assignedTo: 'Patricia Silva',
        tags: ['process', 'onboarding']
      },
      {
        boardId: boards[2]._id,
        title: 'Evaluaciones de desempeño',
        description: 'Realizar evaluaciones del Q4',
        status: 'todo',
        priority: 'high',
        dueDate: new Date('2024-12-31'),
        assignedTo: 'Patricia Silva',
        tags: ['performance', 'review']
      },
      {
        boardId: boards[2]._id,
        title: 'Plan de formación',
        description: 'Organizar cursos de desarrollo profesional',
        status: 'todo',
        priority: 'medium',
        tags: ['training', 'development']
      }
    );

    // Cards para Diseño UI/UX
    cards.push(
      {
        boardId: boards[3]._id,
        title: 'Investigación de usuarios',
        description: 'Realizar entrevistas y encuestas',
        status: 'done',
        priority: 'high',
        assignedTo: 'Roberto Díaz',
        tags: ['research', 'ux']
      },
      {
        boardId: boards[3]._id,
        title: 'Wireframes pantalla principal',
        description: 'Diseñar estructura de la página de inicio',
        status: 'in-progress',
        priority: 'high',
        assignedTo: 'Roberto Díaz',
        dueDate: new Date('2024-12-12'),
        tags: ['wireframes', 'design']
      },
      {
        boardId: boards[3]._id,
        title: 'Sistema de diseño',
        description: 'Crear componentes reutilizables en Figma',
        status: 'in-progress',
        priority: 'high',
        assignedTo: 'Elena Torres',
        tags: ['design-system', 'components']
      },
      {
        boardId: boards[3]._id,
        title: 'Prototipos interactivos',
        description: 'Crear prototipos navegables para testing',
        status: 'todo',
        priority: 'medium',
        assignedTo: 'Roberto Díaz',
        tags: ['prototype', 'testing']
      },
      {
        boardId: boards[3]._id,
        title: 'Testing de usabilidad',
        description: 'Realizar pruebas con usuarios reales',
        status: 'todo',
        priority: 'medium',
        tags: ['testing', 'usability']
      }
    );

    await Card.insertMany(cards);
    console.log(`📝 ${cards.length} cards creadas`);

    // Mostrar estadísticas
    console.log('\n📊 Estadísticas:');
    for (const board of boards) {
      const count = await Card.countDocuments({ boardId: board._id });
      console.log(`   - ${board.name}: ${count} cards`);
    }

    console.log('\n✨ ¡Base de datos inicializada correctamente!\n');
    
  } catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Conexión cerrada');
    process.exit(0);
  }
};

seedDatabase();

