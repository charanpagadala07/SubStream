const errorMiddleware = (err, req, res, next) => {
    try {
        const error = { ...err };

        error.message = err.message;

        console.error(err);

        //mongodb object not found error
        if(err.name === 'CastError') {
            const message = 'Resource not found';
            const error = new Error(message);
            error.statusCode = 404;
        }

        //mongodb duplicate object found
        if(err.code === 11000) {
            const message = 'Resource already exists';
            const error = new Error(message);
            error.statusCode = 400;
        }

        if(err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message).join(', ');
            const error = new Error(message);
            error.statusCode = 400;
        }

        res.status(error.statusCode || 500 ).json({success: false, message: error.message});
    } catch(error) {
        next(error);
    }
}

export default errorMiddleware;