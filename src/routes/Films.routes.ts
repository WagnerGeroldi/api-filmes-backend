import { Router } from "express";

import FilmController from "../controllers/FilmController";

const filmsRoutes = Router();

filmsRoutes.post("/favorite", FilmController.addFavorite)
filmsRoutes.get("/findFavorite", FilmController.findFavorites)
filmsRoutes.get("/findFavorite/:imdbID", FilmController.findFilmFavorite)
filmsRoutes.delete("/removeFavorite/:imdbID", FilmController.removeFavorite)

export { filmsRoutes };
