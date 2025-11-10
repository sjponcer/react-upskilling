import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bff-db';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB exitosamente');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error);
    process.exit(1);
  }
};

// Manejar eventos de conexión
mongoose.connection.on('connected', () => {
  console.log('📦 Mongoose conectado a MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Error en la conexión de Mongoose:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('📴 Mongoose desconectado de MongoDB');
});

// Cerrar conexión cuando la aplicación se cierra
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🛑 Conexión de Mongoose cerrada por terminación de la aplicación');
  process.exit(0);
});

export default connectDB;

