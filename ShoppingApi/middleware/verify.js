const jwt = require('jsonwebtoken')



const verifyToken = async(req, res, next) => {

    const token = req.cookies.token;

    if (!token) res.status(500).json({message: 'you are not logged in'})

    jwt.verify(token, process.env.SECRET, (err, user) => {

        if (err) res.status(500).json('Token not valid')
            
        req.user = user
        next()

    })

}


const verifyUser = async(req, res, next) => {

    verifyToken(req, res, next, () => {

        if (req.user.id == req.params.id || req.user.isAdmin) {
            next()
        } 
        else {
            res.status(500).json({message: 'you are not logged in'})
        }
    })

}


const verifyAdmin = async(req, res, next) => {

    verifyToken(req, res, next, () => {

        if (req.user.isAdmin) {
            console.log(req.user.isAdmin)
            next()
        } 
        else {
            res.status(500).json({message: 'you are not admin'})
        }
    })

}





module.exports = {verifyToken, verifyUser, verifyAdmin}