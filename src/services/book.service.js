import { Book } from '../models/book.model.js';
import { ServiceError } from '../utils/errors/ServiceError.js';
import { BookErrorCodes } from '../utils/errors/book.errorCodes.js';

export const addAuthorToBook = async (book, authorId) => {
    try {
    const existAuthor = book.authors.find(author => author.toString() === authorId);
    if (existAuthor) throw new ServiceError('El autor ya fue asignado al libro', BookErrorCodes.AUTHOR_ALREADY_ASSIGNED);
    book.authors.push(authorId);
    const bookUpdated = await book.save();
    return bookUpdated;
    } catch (error) {
    throw new ServiceError('Error al asignar el autor al libro', BookErrorCodes.AUTHOR_ASSIGN_FAILED);
    }
}

export const createBook = async (bookData) => {
    try {
        // Verifica si el libro ya existe por título
        const existingBook = await Book.findOne({ title: bookData.title });
        if (existingBook) {
            throw new ServiceError('El libro ya existe', BookErrorCodes.BOOK_ALREADY_EXISTS);
        }

        const newBook = new Book(bookData);
        const bookCreated = await newBook.save();
        return bookCreated;
    } catch (error) {
        throw new ServiceError('Error al crear el libro', BookErrorCodes.BOOK_CREATION_FAILED);
    }
}