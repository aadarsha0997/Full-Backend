import prisma from "../config/db.js";

const createUser = async (req, res) => {

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

//Get all fields of post of this user 

// const getUser = async (req, res) => {
//     const user = await prisma.user.findMany(
//         {
//             include: {
//                 posts: true
//             },
//         }
//     );
//     res.json(user);
// }
const getUser = async (req, res) => {
    const user = await prisma.user.findMany(
        {
            select: {
                _count: {
                    select: {
                        posts: true,
                    }
                }
            }
        }
    );
    res.json(user);
}


// ######## get tiele and comment count of that post
// const getUser = async (req, res) => {
//     const user = await prisma.user.findMany(
//         {
//             include: {
//                 posts: {
//                     select: {
//                         title: true,
//                         comment_count: true,
//                     }
//                 }
//             },
//         }
//     );
//     res.json(user);
// }

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
    createUser,
    getUserById,
    updateUser,
    deleteUser,
}