import { Editorial } from '../models/editorial.model.js';

export const saveEditorial = async (editorialData) => {
    const editorial = new Editorial(editorialData);
    return await editorial.save();
};

export const findAllEditorials = async () => {
    return await Editorial.find().populate('books');
};

export const deleteEditorialById = async (id) => {
    return await Editorial.findByIdAndDelete(id);

};

export const addBookToEditorial = async (editorialId, bookId) => {
    const editorial = await Editorial.findById(editorialId);
    if (!editorial) throw new ServiceError('Editorial no encontrada', 3001);

    const existBook = editorial.books.find(book => book.toString() === bookId);
    if (existBook) throw new ServiceError('El libro ya está asignado a la editorial', 3002);

    editorial.books.push(bookId);
    return await editorial.save();
};


