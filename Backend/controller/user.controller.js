import { User } from "../model/user.model.js";

import bcryptjs from 'bcryptjs'

export const signUp = async (req, res) => {
    try {
        const { fullName, emailId, password } = req.body
        const user = await User.findOne({ emailId })
        if (user) {
            return res.status(400).json({ message: 'User Already Exists' })
        }

        const hashedPassword = await bcryptjs.hash(password, 10)
        const createdUser = new User({
            fullName: fullName,
            emailId: emailId,
            password: hashedPassword
        })
        await createdUser.save()
        res.status(201).json({ message: 'User Created Successfully' })

    } catch (error) {
        console.log(`Error: `, error.message);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const login = async (req,res) =>{
    try {
        const {emailId, password} = req.body
        const user = await User.findOne({emailId})
        const isPasswordMatch = await bcryptjs.compare(password, user.password)
        if(!user || !isPasswordMatch){
            return res.status(400).json({message:'Invalid username or password'})
        }else{
            res.status(200).json({
                message:'LoggedIn Successfully',
                user:{
                    id:user.id,
                    fullName:user.fullName,
                    emailId:user.emailId
                }
            })
        }
    } catch (error) {
        console.log(`Error: `,error.message);
        return res.status(500).json({message:'Internal Server Error'})
    }
}