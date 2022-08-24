import mongoose from "mongoose";

const Favoriteschema = new mongoose.Schema({
  imdbID: String,
  Poster: String,
  Title: String,
  Year: String
});

const FavoriteModel = mongoose.model("favoriteFilm", Favoriteschema);

export default FavoriteModel
