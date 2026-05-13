import prisma from "../config/db.js";

const createPost = async (req, res) => {

    const { title, description, user_id } = req.body;

    const post = await prisma.post.create({
        data: {
            title,
            description,
            user_id: Number(user_id),
        },
    });

    res.json(post);
};


const getPost = async (req, res) => {

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;


    if (page <= 0) {
        page = 1;
    }
    if (limit <= 0 || limit >= 100) {
        limit = 10;
    }
    const skip = (page - 1) * limit;

    const post = await prisma.post.findMany({
        skip: skip,
        take: limit,
    });
    const totalPosts = await prisma.post.count();
    const totalPages = Math.ceil(totalPosts / limit);
    res.json({
        post, meta: {
            totalPages, currentPage: page,
            limit: limit,
        }
    });
}

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    const post = await prisma.post.update({
        where: {
            id: Number(id),
        },
        data: {
            title: title,
            description: description,
        },
    })
    res.json({ message: "Update successfully", post })
}

const deletePost = async (req, res) => {
    const { id } = req.params;
    const post = await prisma.post.delete({
        where: {
            id: Number(id),
        }
    })
    res.json({
        message: "User deleted successfully",
        post
    });
}

const getPostById = async (req, res) => {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
        where: {
            id: Number(id),
        },
    })
    res.json(post);
}

export const postController = {
    getPost,
    createPost,
    getPostById,
    updatePost,
    deletePost,
}