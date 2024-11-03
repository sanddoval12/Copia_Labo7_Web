import mongoose from 'mongoose';
import 'dotenv/config';

export const connectiondb = async () => {
    const URI = process.env.MONGODB_URI;

    if (!URI) {
        throw new Error('No se ha definido la URI de la base de datos');
    }

    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Base de datos conectada');
    } catch (e) {
        console.error('Error al conectar a MongoDB:', e);
        throw new Error('Error al conectar a MongoDB');
    }
};