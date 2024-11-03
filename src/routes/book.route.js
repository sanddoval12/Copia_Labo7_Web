import { Router } from 'express';
import {createBookController,findAllBooksController, deleteBookController, addBookToAuthorController } from '../controllers/book.controller';

const bookRouter = Router();

bookRouter.post('/create', createBookController); // Nueva ruta para crear libros
bookRouter.get('/books', findAllBooksController);
bookRouter.delete('/:id', deleteBookController);
bookRouter.put('/:bookId/:authorId', addBookToAuthorController);

export { bookRouter };