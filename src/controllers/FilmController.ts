import {Request, Response } from "express";
import FavoriteModel from "../Database/Model/FilmsFavoritesModel";

class FilmController {
 
  async addFavorite(req: Request, res: Response) {
    const { Title, Year, imdbID, Poster } = req.body;

    const result = await FavoriteModel.findOne({ imdbID: imdbID });

    if (result !== null) {
      res.status(400).json({ message: "Filme já é um favorito" });
    } else {
      const favoriteFilm = new FavoriteModel({
        Title,
        Year,
        imdbID,
        Poster,
      });

      await favoriteFilm.save();

      return res
        .status(201)
        .json({ message: "Favorito adicionado com sucesso" });
    }
  }

  async findFavorites(req: Request, res: Response) {

    const favoritesFilm = await FavoriteModel.find();
    
    return res.status(201).json(favoritesFilm);
  }

  async findFilmFavorite(req: Request, res: Response) {
    const { imdbID } = req.params;
    const result = await FavoriteModel.findOne({ imdbID: imdbID });

    if (result !== null) {
      res.status(200).json({ message: true });
    } else {
      res.status(400).json({ message: false });
    }
  }

  async removeFavorite(req: Request, res: Response) {
    const { imdbID } = req.params;
    await FavoriteModel.remove({ imdbID: imdbID });
    const favoritesFilm = await FavoriteModel.find();
    return res.status(200).json({ message: "Removido com sucesso", favoritesFilm });
  }
}

export default new FilmController();
