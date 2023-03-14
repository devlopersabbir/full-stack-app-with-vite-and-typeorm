import express from "express";
import { AppDataSource } from "./data-source";
import cors from "cors";
import { corsOption } from "./configs/corsOptions";
import { bookRoutes } from "./routes";

const app = express();
app.use(express.json());
app.use(cors(corsOption));

// route
app.use("/api", bookRoutes);

const PORT = 5000;
// app data init
AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
