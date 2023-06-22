const jwt=require('jsonwebtoken')


const authentication = async (req, res , next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).send('No token provided')
    }
  
    const token = authHeader.split(' ')[1]
  
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET)
      const {email,username,phone,isZairzaMember}=payload;
      req.auth={email,username,phone,isZairzaMember};
      next();
    } catch (error) {
      res.status(404).send('Not authorized to access this route')
    }
}

module.exports=authentication;