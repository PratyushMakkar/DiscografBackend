const express = require('express')


//Route to Generate JWT Tokens
const AuthRouter = express.Router()


AuthRouter.get('/generateToken', async (req, res) => {
  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
    return res.status(401).json({ message: 'Missing Authorization Header' });
  }

  const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    const user = await userService.authenticate({ username, password });
    if (!user) {
        return res.status(401).json({ message: 'Invalid Authentication Credentials' });
    }

    // attach user to request object
    req.user = user

})

async function AuthMiddleware(req, res, next) {
  //Allows access to the generate Token endpoint 
  if (req.path === '/auth/generateToken') {
    next();
  }

  if (!req.headers.authorization) {
    return res.status(401).json({message: 'Absent JWT Authorization Header'})
  }

  const token = req.headers.authorization
  const username = 
  next();
}