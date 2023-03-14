import * as dotenv from "dotenv";
dotenv.config();

const allowedOrigins: Array<string> = [
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "https://127.0.0.1:5173",
  "http://localhsot:5173",
  "http://localhsot:5173/*",
  "http://localhost:5000",
];

export default allowedOrigins;
