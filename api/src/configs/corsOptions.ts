import { CorsOptions } from "cors";
import allowedOrigins from "./allowedOrigin";

export const corsOption: CorsOptions = {
  origin(requestOrign, callback) {
    if (!requestOrign) {
      callback(null, true);
    } else {
      if (allowedOrigins.indexOf(requestOrign) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
