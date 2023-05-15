// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";


type Data = {
  // title: string,
  // image: string,
  // description: string,
  // address:string
  message: string;
};

const url =
  "mongodb+srv://chandra:1994%40Bhan@cluster0.fqjjcv1.mongodb.net/meetups?retryWrites=true&w=majority";
const database = "meetups";
const client = new MongoClient(url);

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   if (req.method === "POST") {
//     const data = req.body;
//     const client = await MongoClient.connect(
//       "mongodb+srv://chandra:1994%40Bhan@cluster0.fqjjcv1.mongodb.net/meetups?retryWrites=true&w=majority"
//     );
//     const db = client.db();
//     let meetupcollection = db.collection("meetups");
//     let result = await meetupcollection.insertOne(data);
//     console.log(result);
//     client.close();

//     // Mongoose.connect(mongoURI,()=> {
//     //   console.log("connected to Mongo db successfully");
//     // })
//     res.status(200).json({ message: "Meetup is Inserted!" });
//   }
// }

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://chandra:1994%40Bhan@cluster0.fqjjcv1.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    client.close();
    res.status(201).json({ message: "Meetup inserted!" });
  }
}
export default handler;
