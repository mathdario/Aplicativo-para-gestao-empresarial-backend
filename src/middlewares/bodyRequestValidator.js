const { error400 } = require("../functions/error");

const bodyRequestValidator = joiSchema => async (req, res, next) => {
    try {
        await joiSchema.validateAsync(req.body);
        next();
    } catch (error) {
        return error400(res, error.message);
    }
}

module.exports = bodyRequestValidator;