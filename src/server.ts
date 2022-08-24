import express from "express";
import cors from "cors";
import { router } from "./routes";
import connectMongoDB from "./Database";

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  connectMongoDB;
  console.log(`Server rodando na porta ${PORT}`);
});
