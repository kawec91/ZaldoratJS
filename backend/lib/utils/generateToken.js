import jwt from "jsonwebtoken";

export const generateTokanAndSetCookie = (userId, res) => {
  //JWT Secret Create with command openssl rand -base64 32 in bash terminal
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    //in ms days*hours*min*sec*ms
    maxAge: 15 * 24 * 60 * 60 * 1000,
    //prevent xss attacks cross-site scripting attacks
    httpOnly: true,
    //CSRF attacks cross-site request forgery attacks
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
};
