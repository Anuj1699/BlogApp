import pool from "../db.js";
import { addUser, checkEmail } from "../query.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/auth.js";

export const register = async(req, res) => {
    const { username, email, full_name, password } = req.body;

    try {
        const emailCheck = await pool.query(checkEmail, [email]);

        if(emailCheck.rows.length > 0){
            return res.status(400).json({message: "Email already Exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password,salt);

        await pool.query(addUser, [username, email, hashedPass, full_name]);
        return res.status(201).json({ message: "User Registered Successfully, Please Login"});
    } catch (error) {
        return res.status(500).json({ message: error.detail });
    }
}

export const login = async(req, res) => {
    const {email, password} = req.body;
    try {
        const emailCheck = await pool.query(checkEmail, [email]);
        if(emailCheck.rows.length === 0){
            return res.status(500).json({message: "Email dosen't exist, Please register"});
        }
        const checkPass = await bcrypt.compare(password, emailCheck.rows[0].password);

        const {username, user_id, avatar, role, full_name} = emailCheck.rows[0];
        const token = generateToken(username, email, user_id, avatar, full_name, role);
        if(checkPass){
            return res.status(201).json({message: "Login Successfull", emailCheck, token});
        }
        return res.status(500).json({message: "Invalid Email or Password"});
    } catch (error) {
        res.status(500).json({message: error.detail})
    }
}