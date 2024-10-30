import jwt from 'jsonwebtoken';

// admin authentication middleware
const authAdmin = async (req, res, next) => {
  try {
    const adminToken = req.headers.authorization; 

    if (!adminToken) {
      return res.json({
        success: false,
        message: "Invalid credentials for login",
      });
    }

    const token = adminToken.split(' ')[1];
  

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({
        success: false,
        message: "Invalid adminToken ",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export default authAdmin;
