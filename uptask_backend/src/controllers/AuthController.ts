import type { Request, Response } from 'express'
import User from '../models/User'
import { hashPassword } from '../utils/auth'
import Token from '../models/Token'
import { generateToken } from '../utils/token'
import { AuthEmail } from '../emails/AuthEmail'

export class AuthController {
    
    static createAccount = async (req: Request, res: Response) => {
        try {
            const {password, email} = req.body
            const user = new User(req.body)

            //Prevenir duplicados

            const userExists = await User.findOne({email})
            if(userExists) {
                const error = new Error('El usuario ya esta registrado en el sistema')
                return res.status(409).json({error: error.message})
            }

            // Hash password
            user.password = await hashPassword(password)

            // Generar token

            const token = new Token()
            token.token = generateToken()
            token.user = user.id

            // Enviar email

            AuthEmail.sendConfirmationEmail({
                email: user.email,
                name: user.email,
                token: token.token
            })

            
            await Promise.allSettled([user.save(), token.save()])
            res.send('Cuenta Creada Revisa tu email para confirmarla')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static confirmAccount = async (req: Request, res: Response) => {
        try {
            const {token } = req.body
            console.log(token)
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }


}