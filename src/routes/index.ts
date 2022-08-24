import { Router } from "express";
import { filmsRoutes } from "./Films.routes";

const router = Router();

router.use("/films", filmsRoutes);


export { router };