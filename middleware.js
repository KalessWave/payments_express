// HARD DB
const users = [
    {
        username: 'john',
        password: 'password123admin',
        role: 'admin'
    }, {
        username: 'anna',
        password: 'password123member',
        role: 'member'
    }
  ];
  const accessTokenSecret2 = 'youraccesstokensecret';


//Middleware handling the authentification process, to be used for all path except /login
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.X-JWT-Assertion;
  
    if (authHeader) {
        const token = authHeader.split(' ')[1];
  
        jwt.verify(token, accessTokenSecret2, (err, user) => {
            if (err) {
                return res.status(403).send('Access is forbidden');
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).send('Authentification is missing');
    }
  };

  module.exports = authenticateJWT;