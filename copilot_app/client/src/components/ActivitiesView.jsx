import React from 'react';
import { withRouter } from 'react-router';

function ActivitiesView(props) {
  console.log(props)
  return (
    
    <div className="activity-container">
      {props.activities.map(activity => (
        <div
          key={activity.id}
          className="activity-card"
          onClick={(e) => {
            debugger;
            props.history.push(`/activities/${activity.id}`);
            window.scrollTo(0, 0);
          }}>
            <p>{activity.category}</p>
          <h3>
            <p>{activity.name}</p>
          </h3>
        </div>
      ))}
      <div
        className="activity-card"
        onClick={() => {
          props.history.push('/new/activity');
          window.scrollTo(0, 0);
        }}>
        {/* <img */}
          {/* // alt="no image" */}
          {/* // src=" # " */}
          {/* className="act-view-image" /> */}
        <h3>Create a new activity</h3>
      </div>
    </div>
  )
}

export default withRouter(ActivitiesView)