import { Router } from 'express';
import { createEditorialController, getAllEditorialsController } from '../controllers/editorial.controller.js';

const editorialRouter = Router();

editorialRouter.post('/', createEditorialController);
editorialRouter.get('/', getAllEditorialsController);
editorialRouter.delete('/:editorialId', deleteEditorialController);
editorialRouter.put('/:editorialId/book/:bookId', assignBookToEditorialController);

export { editorialRouter };
