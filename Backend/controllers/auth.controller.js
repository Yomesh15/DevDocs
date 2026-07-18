import { getAuth } from "firebase-admin/auth";
import UserModel from "../models/auth.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


// register
export const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required", success: false })
        }

        const user = await UserModel.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User Already Exists", success: false })
        }

        const hashpassword = await bcrypt.hash(password, 11)

        await UserModel.create({ name, email, password: hashpassword })


        return res.status(201).json({ message: "User Registered", success: true })

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Internal Server Error", success: false })

    }
}


// login
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User Not Exist",
                success: false
            });
        }

        if (!user.password) {
            return res.status(400).json({
                message: "This account was created using Google. Please login with Google.",
                success: false
            });
        }


        const comparepassword = await bcrypt.compare(
            password,
            user.password
        );


        if (!comparepassword) {
            return res.status(400).json({
                message: "Invalid Credentials",
                success: false
            });
        }


        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        );


        res.cookie("jwt", token, {
            httpOnly: true,
            secure: false,  
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });



        return res.status(200).json({
            message: "Login Successfully",
            success: true,
            user,
            token
        });


    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};


// google auth register login
export const GoogleAuth = async (req, res) => {
    try {
        const { idToken } = req.body;

        if (!idToken) {
            return res.status(400).json({
                success: false,
                message: "ID Token is required",
            });
        }

        const decodedToken = await getAuth().verifyIdToken(idToken);

        const { name, email } = decodedToken;

        let user = await UserModel.findOne({ email });

        if (!user) {
            user = await UserModel.create({
                name,
                email,
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        );


        res.cookie("jwt", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "Welcome Editor",
            user,
            token
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


// logout
export const Logout = async (req, res) => {
    try {
        res.clearCookie("jwt")

        return res.status(200).json({ message: "Logout", success: true })
    } catch (error) {
        return res.status(500).json({ message: "Logout Failed", success: false })
    }
}


// getinfo of loggedin user
export const GetCurrentUser = async (req, res) => {
    try {
        return res.status(200).json({ message: "Information Fetched", success: true, user: req.user })
    } catch (error) {
        return res.status(500).json({ message: "Login Again", success: false })
    }
}


// update profile inforation
export const UpdateProfile = async (req, res) => {
    try {
        const { name, bio, jobTitle, company } = req.body;

        const user = await UserModel.findByIdAndUpdate(
            req.user._id,
            {
                name,
                bio,
                jobTitle,
                company
            },
            {
                new: true,
                runValidators: true
            }
        );

        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            user
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

