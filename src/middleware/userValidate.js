export const userValidator = (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All field are required."
        })
    }
    if (
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string"
    ) {
        return res.status(400).json({
            message: "Invalid input type."
        })
    }
    if (
        name.trim() === "" ||
        email.trim() === "" ||
        password.trim() === ""
    ) {
        return res.status(400).json({
            message: "Fields can't be empty."
        })
    }

    if (!email.includes("@")) {
        return res.status(400).json({
            message: "Invalid email formate."
        })
    }
    next();
}