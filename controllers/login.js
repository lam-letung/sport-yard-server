import jwt from 'jsonwebtoken';

export const Login = (req, res) => {
    const KEY = process.env.SECRET_KEY 
    const { id , role  } = req.body
    try {
        res.status(200).json({
            token: jwt.sign({ id , role }, KEY)
        })
    } catch {
        res.status(400).end()
    }
}