import { MongoClient } from 'mongodb';

const url = "mongodb+srv://godprofit:TjI17M9dNT6VMeVQ@godprofit.vfmhzn9.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(url, { useUnifiedTopology: true });

const connectToMongoDB = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
};

export { client, connectToMongoDB };
