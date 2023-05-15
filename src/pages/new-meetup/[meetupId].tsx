// how we can create dynamic route in next js
import { Fragment } from "react";
import { useRouter } from "next/router";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

const MeetupDetails = (props: any) => {
  const router = useRouter();
  
  return (
    <MeetupDetail
      image={props?.meetupData?.image}
      title={props?.meetupData?.title}
      address={props?.meetupData?.address}
      description={props?.meetupData?.description}
    />
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://chandra:1994%40Bhan@cluster0.fqjjcv1.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  // console.log(meetups, "chandra===");
  return {
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context: any) {
  // fetch data for a single meetup
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://chandra:1994%40Bhan@cluster0.fqjjcv1.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup?._id.toString(),
        title: selectedMeetup?.title,
        address: selectedMeetup?.address,
        image: selectedMeetup?.image,
        description: selectedMeetup?.description,
      },
    },
  };
}

export default MeetupDetails;

// export async function getStaticPaths() {
//   return {
//     fallback: true,
//     paths: [
//       {
//         params: {
//           meetupId: "m1",
//         },
//       },
//       {
//         params: {
//           meetupId: "m2",
//         },
//       },
//     ],
//   };
// }

// export async function getStaticProps(context: any) {
//   const meetupId = context.params.meetupId;
//   console.log(meetupId);

//   // fetch data from an API

//   const client = await MongoClient.connect(
//     "mongodb+srv://chandra:1994%40Bhan@cluster0.fqjjcv1.mongodb.net/meetups?retryWrites=true&w=majority"
//   );
//   const db = client.db();
//   const meetupsCollection = db.collection("meetups");
//   const selectedMeetup = await meetupsCollection.findOne({
//     _id: ObjectId(meetupId),
//   });
//   console.log(selectedMeetup,"chandra==");
//   client.close();

//   // return {
//   //   props: {
//   //     meetupDetail: {
//   //       id: meetupId,
//   //       image:
//   //         "https://images.unsplash.com/photo-1444723121867-7a241cacace9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGxvcyUyMGFuZ2VsZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
//   //       title: "The First Meetup",
//   //       address: "New york steet 12",
//   //       description: "These is a First meetup Place",
//   //     },
//   //   }, // will be passed to the page component as props know we don't need useState and useEd
//   //   // revalidate: 3600, // In seconds
//   // };
// }
