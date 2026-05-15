import { use } from "react";
import prisma from "../config/db.js";

// ####### Normal way to input 2 conditin in DB.


// const createComment = async (req, res) => {

//     const { comment, post_id, user_id } = req.body;

//     const commentData = await prisma.comment.create({
//         data: {
//             comment,
//             post_id,
//             user_id
//         },
//     });

//     await prisma.post.update({
//         where: {
//             id: Number(post_id),
//         },
//         data: {
//             comment_count: {
//                 increment: 1,
//             }
//         }
//     });

//     res.json(commentData);
// };

// ####### Using Transaction to reduce the half entry in DB #####

const createComment = async (req, res) => {
    try {

        const { comment, post_id, user_id } = req.body;
        const commentData = await prisma.$transaction([

            prisma.comment.create({
                data: {
                    comment: comment,
                    post_id: Number(post_id),
                    user_id: Number(user_id)
                }
            })

            ,

            prisma.post.update({
                where: {
                    id: Number(post_id),
                },
                data: {
                    comment_count: {
                        increment: 1,
                    }
                }
            })
        ])

        res.json(commentData);

    } catch (error) {
        res.json({
            message: error.message
        });
    }
}


async function getComment(req, res) {
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
// ### same like transactin but this is intrective transaction not array transaction 
const deleteComment = async (req, res) => {
    try {

        const { id } = req.params;
        const Deletecomment = await prisma.$transaction(

            async (tx) => {
                const comment = await tx.comment.delete({

                    where: {
                        id: Number(id)
                    }
                });
                await tx.post.update({
                    where: {
                        id: comment.post_id,
                    },
                    data: {
                        comment_count: {
                            decrement: 1,
                        }
                    }
                })

            }

        )


        res.json({
            message: "Comment deleted successfully",
            Deletecomment
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
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