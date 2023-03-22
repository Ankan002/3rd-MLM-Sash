import { MongoClient } from 'mongodb';

const url = 'mongodb+srv://suraj:suraj@cluster0.zekdn7n.mongodb.net/?retryWrites=true&w=majority';

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
