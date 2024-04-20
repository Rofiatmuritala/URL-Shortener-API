import User from "../models/usersModel.js";
import jwt from "jsonwebtoken";

export const usersRouteMiddleware = async (req, res, next) => {
  try {
    let token;

    // Check if the user or the request (frontend) has a token in the authorization
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      const error = new Error("Authentication Required");
      error.statusCode = 401;
      return next(error);
    }

    const decodedUser = jwt.verify(token, "secret");

    const user = await User.findById(decodedUser.id).select("-password");

    if (!user) {
      const error = new Error("Authentication Required");
      error.statusCode = 401;
      return next(error);
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
