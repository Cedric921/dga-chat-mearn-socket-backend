/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Types } from "mongoose";
import jwt from "jsonwebtoken";

export const generateToken = (id: Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
};
