// import { Fragment } from "react";
// import Link from "next/link";
import { useRouter } from 'next/router';
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
  const router = useRouter();
  const addMeetupHandler = async (enteredMeetupData: any) => {
    console.log(enteredMeetupData);
    const response = await fetch('/api/new-meetup', {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      const data = await response.json()
      console.log(data,"data==");
      router.push('/');
  };
//   const response = await fetch('/api/new-meetup', {
//     method: 'POST',
//     body: JSON.stringify(enteredMeetupData),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   const data = await response.json();

//   // console.log(data);

//   router.push('/');
// }

  return (
    <NewMeetupForm onAddMeetup={addMeetupHandler} />
    // <Fragment>
    //   <h1>News Page</h1>
    //   <ul>
    //     <li>
    //       <Link href="/news/dynamic-data">Next Js is A great Framework</Link>
    //     </li>
    //     <li>Something-Else</li>
    //   </ul>
    // </Fragment>
  );
};
export default NewMeetupPage;
