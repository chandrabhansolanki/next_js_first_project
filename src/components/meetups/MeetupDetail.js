import { Fragment } from "react";

const MeetupDetail = (props) => {
  return (
    <Fragment>
      <img src={props.image} />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </Fragment>
  );
};
export default MeetupDetail;
