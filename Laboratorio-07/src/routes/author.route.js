import { Router } from 'express';
import {
    createAuthorController,
    assingBookToAuthorController,
    deleteAuthorController
} from '../controllers/author.controller.js';

const authorRouter = Router();

authorRouter.post('/create', createAuthorController);
authorRouter.delete('/:id', deleteAuthorController);

export { authorRouter };