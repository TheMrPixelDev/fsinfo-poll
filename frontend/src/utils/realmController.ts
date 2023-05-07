import * as Realm from "realm-web";

const app = new Realm.App({ id: "fsinfopoll-tmbkt" });

const creadentials = Realm.Credentials.anonymous();

try {
  const user = await app.logIn(creadentials);
} catch (err) {
  console.log(err);
}

const mongo = app.currentUser?.mongoClient("FSinfoPoll");

if (mongo !== undefined) {
  const collection = mongo.db("poll").collection("answers").insertOne();
}
