import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";
import { MongoClient } from "mongodb";

const Dummy_Meetups = [
  {
    id: "m1",
    title: "A first Meetup",
    image:
      "https://images.unsplash.com/flagged/photo-1575597255483-55f2afb6f42c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bmV3JTIweW9yayUyMGNpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    address: "New york street 12 ",
    description: "This is a first meetup ",
  },
  {
    id: "m2",
    title: "A Secound Meetup",
    image:
      "https://images.unsplash.com/photo-1444723121867-7a241cacace9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGxvcyUyMGFuZ2VsZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    address: "Los Angels street 12 ",
    description: "This is a secound meetup ",
  },
];

const HomePage = (props: any) => {
  // const [loadedMeetups, setLoadedMeetups]=useState([])

  //   useEffect(()=> {
  //     setLoadedMeetups(Dummy_Meetups)
  //   },[])

  return (
    <Fragment>
      <Head>
        <title>React Meetup </title>
      </Head>

      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// export async function getServerSideProps(context) {
//   const req = context.req
//   const res = context.res
//   // fetch data from an API
//   return {
//     props: {
//       meetups: Dummy_Meetups
//     }, // will be passed to the page component as props know we don't need useState and useEd

//   }
// }

export async function getStaticProps() {
  // fetch data from an API

  const client = await MongoClient.connect(
    "mongodb+srv://chandra:1994%40Bhan@cluster0.fqjjcv1.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const result = await meetupsCollection.find().toArray();
  

  client.close();
  return {
    props: {
      meetups: result.map((item) => ({
        title: item?.title,
        address : item?.address,
        image: item?.image,
        id : item?._id.toString()
      }))
    }, // will be passed to the page component as props know we don't need useState and useEd
    revalidate: 1, // In seconds
  };
}

export default HomePage;
