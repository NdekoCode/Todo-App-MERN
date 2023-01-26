import { connect } from "mongoose";
process.env.NODE_ENV = "local";
export default async function databaseConnect() {
  let dbUrl;
  if (process.env.NODE_ENV === "local") {
    dbUrl = process.env.DB_URL_LOCAL;
  } else {
    dbUrl = process.env.MONGO_URL;
  }
  try {
    const connexionParams = { useNewUrlParser: true, useUnifiedTopology: true };
    await connect(dbUrl, connexionParams);
    console.log("Connexion à MongoDB reussie");
  } catch (error) {
    console.log("Connexion à MongoDB à échouer", error.message);
  }
}
