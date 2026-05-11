import prisma from "../config/db.js";

const createComment = async (req, res) => {

    const { comment, post_id, user_id } = req.body;

    const commentData = await prisma.comment.create({
        data: {
            comment,
            post_id,
            user_id
        },
    });

    res.json(commentData);
};


const getComment = async (req, res) => {
    const comment = await prisma.comment.findMany();
    res.json(comment);
}

const updateComment = async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;

    const commentData = await prisma.comment.update({
        where: {
            id: Number(id),
        },
        data: {
            comment: comment,
        }
    })
    res.json({ message: "Update successfully", commentData })
}

const deleteComment = async (req, res) => {
    const { id } = req.params;
    const comment = await prisma.comment.delete({
        where: {
            id: Number(id),
        }
    })
    res.json({
        message: "Comment deleted successfully",
        comment
    });
}

const getCommentById = async (req, res) => {
    const { id } = req.params;
    const comment = await prisma.comment.findUnique({
        where: {
            id: Number(id),
        },
    })
    res.json(comment);
}

export const commentController = {
    getComment,
    createComment,
    getCommentById,
    updateComment,
    deleteComment,
}