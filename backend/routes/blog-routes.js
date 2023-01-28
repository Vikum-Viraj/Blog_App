import express from "express"
import { getAllBlogs,addBlog, updateBlog, getById, deleteById, getByUserId } from "../controllers/blog-controller";
const blogrouter = express.Router();


blogrouter.get("/",getAllBlogs);
blogrouter.post("/add",addBlog);
blogrouter.put("/update/:id",updateBlog);
blogrouter.get("/:id",getById);
blogrouter.delete("/:id",deleteById);
blogrouter.get("/user/:id",getByUserId); 

export default blogrouter;