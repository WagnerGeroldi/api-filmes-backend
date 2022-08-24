import mongoose from "mongoose";

const connectMongoDB = mongoose.connect(
  `mongodb+srv://wagner:KSIDNcRnnw4NAoin@apifilmes.parjeqr.mongodb.net/?retryWrites=true&w=majority`
);

export default connectMongoDB;
