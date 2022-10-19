import { connect } from "mongoose";
export default function databaseConnect() {
  const dbUrl = process.env.MONGO_URL;

  return connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connexion à MongoDB reussie");
    })
    .catch(() => {
      console.log("Connexion à MongoDB à échouer");
    });
}
