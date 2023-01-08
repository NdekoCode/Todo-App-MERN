import { connect } from "mongoose";
export default async function databaseConnect() {
  const dbUrl = process.env.MONGO_URL;
  try {
    const connexionParams = { useNewUrlParser: true, useUnifiedTopology: true };
    await connect(dbUrl, connexionParams);
    console.log("Connexion à MongoDB reussie");
  } catch (error) {
    console.log("Connexion à MongoDB à échouer", error.message);
  }
}
