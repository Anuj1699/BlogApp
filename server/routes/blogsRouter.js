import express from "express";
import { verifyToken } from "../utils/auth.js";
import { addBlog, getAllPosts, getCategory, getPost } from './../controller/blogsController.js';

const router = express.Router();

router.post("/addBlog", verifyToken, addBlog);
router.get("/getCategory", getCategory);
router.get("/getAllPosts", getAllPosts);
router.get("/getPost/:id", getPost);

export default router;