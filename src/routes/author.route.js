import { Router } from 'express';
import {createAuthorController, assingBookToAuthorController, deleteAuthorController, getAllAuthorsController} from '../controllers/author.controller';

const authorRouter = Router();

authorRouter.post('/create', createAuthorController);
authorRouter.delete('/:id', deleteAuthorController);
authorRouter.put('/:authorId/:bookId', assingBookToAuthorController); //original
authorRouter.get('/authors', getAllAuthorsController); // Nueva ruta para obtener todos los autores

export { authorRouter };