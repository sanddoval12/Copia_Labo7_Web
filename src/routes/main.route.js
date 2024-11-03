import {bookRouter} from './book.route.js';
import {authorRouter} from './author.route.js';
import { Router } from 'express';
const mainRouter = Router();
mainRouter.use('/book', bookRouter);
mainRouter.use('/author', authorRouter);
import { editorialRouter } from './editorial.route.js';
mainRouter.use('/editorial', editorialRouter);
export { mainRouter };





