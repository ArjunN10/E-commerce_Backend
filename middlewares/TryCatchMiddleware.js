const TrycatchMiddleware = (TrycatchHandler) => {
    return async (req, res, next) => {
        try {
            await TrycatchHandler(req, res, next);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: "failure",
                message: "error",
                error_message: error.message
            });
        }
        next()
    }
}
module.exports = TrycatchMiddleware;