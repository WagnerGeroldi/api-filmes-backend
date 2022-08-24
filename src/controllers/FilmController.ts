import { NextFunction, Request, Response } from "express";
import fetch from "node-fetch";
import FavoriteModel from "../Database/Model/FilmsFavoritesModel";

class FilmController {
  async findFilm(req: Request, res: Response, next: NextFunction) {
    const { search } = req.body;

    await fetch(`https://www.omdbapi.com/?apikey=e20d15b&s=${search}`)
      .then((response: any) => {
        response.json().then((data: any) => {
          return res.status(201).json({ data });
        });
      })
      .catch((e: any) => console.log("Erro"));
  }

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
    return res.status(200).json({ message: "Removido com sucesso" });
  }
}

export default new FilmController();
