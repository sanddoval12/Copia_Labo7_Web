import express from 'express';
const authorRoutes = require('./src/routes/author.route'); 


import 'dotenv/config';
import {errorHandler} from './src/middleware/error.middleware'
import {mainRouter} from './src/routes/main.route'
import {connectiondb} from './src/config/dbConnection.config'

const app = express();
connectiondb();
app.use(express.json());
app.use(mainRouter);
app.use(errorHandler);
app.use('/api', authorRoutes); 
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Error interno del servidor',
        code: err.code || 'INTERNAL_SERVER_ERROR',
    });
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=>{
console.log(`Server is running on port ${PORT}`);
})




