import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017/mydatabase';

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
