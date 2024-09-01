const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

export const generateJWT = (payload, expiresIn = "6h") => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

// Function to validate JWT
export const validateJWT = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { valid: true, payload: decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
};
