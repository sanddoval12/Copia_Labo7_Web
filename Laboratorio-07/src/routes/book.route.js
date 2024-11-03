import { Router } from 'express';

import {
    findAllBooksController,
    deleteBookController,
    addBookToAuthorController
} from '../controllers/book.controller.js';

const bookRouter = Router();

bookRouter.get('/books', findAllBooksController);
bookRouter.delete('/:id', deleteBookController);
bookRouter.put('/:bookId/:authorId', addBookToAuthorController);

export { bookRouter };