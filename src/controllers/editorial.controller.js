import { saveEditorial, findAllEditorials } from '../services/editorial.service.js';
import createError from 'http-errors';

export const createEditorialController = async (req, res, next) => {
    try {
        const editorial = req.body;
        const editorialCreated = await saveEditorial(editorial);
        res.status(201).json({ message: 'editorial created', data: editorialCreated });
    } catch (e) {
        next(createError(500, 'Error al crear la editorial'));
    }
};

export const getAllEditorialsController = async (req, res, next) => {
    try {
        const editorials = await findAllEditorials();
        res.status(200).json({ message: 'editorials retrieved', data: editorials });
    } catch (e) {
        next(createError(500, 'Error al obtener las editoriales'));
    }
};

export const deleteEditorialController = async (req, res, next) => {
    try {
        const editorialId = req.params.editorialId;
        await deleteEditorialById(editorialId);
        res.status(200).json({ message: 'Editorial eliminada' });
    } catch (e) {
        next(createError(500, 'Error al eliminar la editorial'));
    }
};

export const assignBookToEditorialController = async (req, res, next) => {
    try {
        const { editorialId, bookId } = req.params;
        const updatedEditorial = await addBookToEditorial(editorialId, bookId);
        res.status(200).json({ message: 'Libro asignado a la editorial', data: updatedEditorial });
    } catch (e) {
        next(createError(500, 'Error al asignar el libro a la editorial'));
    }
};

