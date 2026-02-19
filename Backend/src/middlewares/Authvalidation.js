import joi from "joi"

export const SignupValidator = (req, res, next) => {
    const schema = joi.object({
        name: joi.string().min(3).max(100).required(),
        email: joi.string().email().required(),
        pass: joi.string().min(6).max(20).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};
export const LoginValidator = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        pass: joi.string().min(6).max(20).required()
    })

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({ message: "Bad request" })
    }
    next()
}
export const OtpValidator = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required(),

    })

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({ message: "write correct Email" })
    }
    next()
}
export const OtpValidator2 = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        otp: joi.string().length(6).required()
    })

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({ message: "Bad request" })
    }
    next()
}

