export const findAllAuthors = async () => {
    try {
        const authors = await Author.find().populate('books');
        return authors;
    } catch (error) {
        throw new ServiceError('Error al obtener los autores', AuthorErrorCodes.AUTHOR_FETCH_FAILED);
    }
}


