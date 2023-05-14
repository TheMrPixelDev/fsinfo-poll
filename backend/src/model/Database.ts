import { MongoClient, ObjectId } from "npm:mongodb@latest";
import { Answer, Question } from "./Interfaces.ts";

export default class Database {
  private client: MongoClient;

  public constructor(
    username: string | undefined,
    password: string | undefined,
  ) {
    if (username === undefined || password === undefined) {
      throw Error("No credentials provided for MongoDB");
    }
    const connectionString =
      `mongodb+srv://${username}:${password}@fsinfopoll.qj9glmq.mongodb.net/?retryWrites=true&w=majority`;
    console.log(connectionString);
    this.client = new MongoClient(connectionString);
    this.client.connect();
  }

  public async getQuestions() {
    return await this.client.db("poll").collection("questions").find()
      .toArray() as Question[];
  }

  public async addQuestion(question: Question) {
    return await this.client.db("poll").collection("questions").insertOne(
      question,
    );
  }

  public async addAnswers(answers: Answer[]) {
    return await this.client.db("poll").collection("answers").insertMany(
      answers,
    );
  }

  public async getAnswers() {
    return await this.client.db("poll").collection("answers").find()
      .toArray() as Answer[];
  }

  public async deleteQuestion(qusetionId: string) {
    return await this.client.db("poll").collection("questions").deleteOne({
      "_id": new ObjectId(qusetionId),
    });
  }

  public async updateQuestion(updatedQuestion: Question) {
    return await this.client.db("poll").collection("questions").updateOne({
      _id: updatedQuestion._id,
    }, updatedQuestion);
  }
}
