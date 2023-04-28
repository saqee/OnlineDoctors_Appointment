import jwt from "jsonwebtoken"

export const protect = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(400).send({
          message: "Auth failed",
          success: false,
        })
      } else {
        req.userId = decode.id
        next()
      }
    })
  } catch (error) {
    return res.status(400).send({
      message: "Auth failed" + error,
      success: false,
    })
  }
}
