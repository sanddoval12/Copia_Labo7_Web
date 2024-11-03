import { createBook } from '../services/book.service.js';
import createError from 'http-errors';
import { BookErrorCodes } from '../utils/errors/book.errorCodes.js';
import {findAllBooks, deleteBook, findBookById, addAuthorToBook} from'../services/book.service.js';
import { findAuthorById, deleteBookFromAuthor } from'../services/author.service.js';
import { AuthorErrorCodes } from '../utils/errors/author.errorCodes.js';

export const createBookController = async (req, res, next) => {
    try {
        const bookData = req.body;
        const bookCreated = await createBook(bookData);
        res.status(201).json({ message: 'Book created', data: bookCreated });
    } catch (e) {
        console.error('Detailed Error:', e); // Esto imprimirá el error exacto en la consola
        if (e.code === BookErrorCodes.BOOK_ALREADY_EXISTS) {
            next(createError(400, 'El libro ya existe'));
        } else {
            res.status(500).json({ message: 'Error al crear el libro', error: e.message }); // Envía el mensaje de error exacto
        }
    }
};

export const findAllBooksController = async (req, res, next) => {
    try {
        const books = await findAllBooks();
        res.status(200).json({ data: books });
    } catch (e) {
        switch(e.code){
            case BookErrorCodes.BOOK_FETCH_FAILED:
                next(createError(500, 'Error al obtener los libros'));
                break;
            default:
                next(e);
        }
    }
}

export const deleteBookController = async (req, res, next) => {
    try {
        const { id } = req.params;
        await findBookById(id);

        await deleteBookFromAuthor(id);

        await deleteBook(id);
        res.status(201).json({ message: 'Libro eliminada' })
    } catch (e) {
        switch(e.code){
            case BookErrorCodes.BOOK_NOT_FOUND:
                next(createError(404, 'El libro no existe'));
                break;
            case BookErrorCodes.BOOK_FETCH_FAILED:
                next(createError(500, 'Error al obtener el libro'));
                break;
            case BookErrorCodes.BOOK_DELETE_FAILED:
                next(createError(500, 'Error al eliminar el libro'));
                break;
            case AuthorErrorCodes.NO_AUTHORS_FOUND:
                next(createError(500, 'Error al eliminar el libro de los autores'));
                break;
            case AuthorErrorCodes.BOOK_DELETE_FAILED:
                next(createError(500, 'Error al eliminar el libro de los autores'));
                break;
            default:
                next(e);
        }
    }
}

export const addBookToAuthorController = async (req, res, next) => {
    try {
        const { bookId, authorId } = req.params;

        const book = await findBookById(bookId);

        await findAuthorById(authorId);

        const bookUpdated = await addAuthorToBook(book, authorId);
        res.status(200).json({ message: 'Autor asignado al libro', data: bookUpdated });
    } catch (e) {
        switch(e.code){
            case BookErrorCodes.BOOK_NOT_FOUND:
                next(createError(404, 'El libro no existe'));
                break;
            case BookErrorCodes.BOOK_FETCH_FAILED:
                next(createError(500, 'Error al obtener los libros'));
                break;
            case AuthorErrorCodes.AUTHOR_NOT_FOUND:
                next(createError(404, 'El autor no existe'));
                break;
            case AuthorErrorCodes.AUTHOR_FETCH_BY_ID_FAILED:
                next(createError(500, 'Error al buscar el autor por ID'));
                break;
            case BookErrorCodes.AUTHOR_ALREADY_ASSIGNED:    
                next(createError(400, 'El autor ya fue asignado al libro'));
                break;
            case BookErrorCodes.AUTHOR_ASSIGN_FAILED:
                next(createError(500, 'Error al asignar el autor al libro'));
                break;
            default:
                next(e);
        }
    }
}


