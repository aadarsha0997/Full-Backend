import prisma from "../config/db.js";

const createUsers = async (req, res) => {

    const { name, email, password } = req.body;

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password,
        },
    });

    res.json(user);
};


const getUser = async (req, res) => {
    const user = await prisma.user.findMany();
    res.json(user);
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await prisma.user.update({
        where: {
            id: Number(id),
        },
        data: {
            name,
            email,
            password,
        }
    })
    res.json({ message: "Update successfully", user })
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.delete({
        where: {
            id: Number(id),
        }
    })
    res.json({
        message: "User deleted successfully",
        user
    });
}

const getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
        where: {
            id: Number(id),
        },
    })
    res.json(user);
}

export const userController = {
    getUser,
    createUsers,
    getUserById,
    updateUser,
    deleteUser,
}