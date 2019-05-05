import React from 'react';
import { withRouter } from 'react-router-dom';

function EditActivity(props) {
  return (
    <div>
      <h3>Edit previous activity</h3>
      <form onSubmit={props.handleSubmit}>
        <p>Category:</p>
        <input
          type="text"
          name="category"
          value={props.activityForm.photo}
          onChange={props.handleFormChange} />
        <p>Activity name:</p>

        <input
          type="text"
          name="name"
          value={props.activityForm.name}
          onChange={props.handleFormChange} />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default withRouter(EditActivity);
