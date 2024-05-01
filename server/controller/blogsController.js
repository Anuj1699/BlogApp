import { addPost, allPosts, categoryList, getCategoryId, getUserId, post } from './../query.js';
import pool from "../db.js";

export const addBlog = async(req,res) => {
    const {formData, author_id, image} = req.body;

    try {
        if (!formData.title || !formData.content || !author_id || !formData.category_id || !image) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const author = await pool.query(getUserId, [author_id]);
        const category = await pool.query(getCategoryId, [formData.category_id]);
        const newPost = await pool.query(addPost, [formData.title, formData.content, author_id, formData.category_id, image, author.rows[0].avatar, author.rows[0].full_name, category.rows[0].name]);
        return res.status(201).json({message: "Successfully Posted"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.detail});
    }
}

export const getCategory = async(req,res,next) => {
    try {
         const list = await pool.query(categoryList);
         return res.status(201).json({list: list.rows});
    } catch (error) {
        next(error)
    }
}

export const getAllPosts = async(req,res,next) => {
    try {
        const posts = await pool.query(allPosts);
        res.status(201).json(posts);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const getPost = async(req,res,next) => {
    const {id} = req.params;
    try {
        const postData = await pool.query(post, [id]);
        return res.status(201).json(postData);
    } catch (error) {
        console.log(error);
    }
}