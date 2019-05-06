import React, { Component } from 'react';
import EditActivity from './EditActivity'
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';

class ActivitiesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false
    }
  }

  componentDidMount() {
    this.props.mountEditForm(this.props.id);
  }

  render() {
    const { activity } = this.props;
    return (
      <div className="activities-page">
        {activity === undefined ? <h2>Loading . . .</h2> : (
          <div>
            {/* <img alt={activity.name} src={activity.photo} /> */}
            {this.state.isEdit ?
              <Route path={'/activities/:id/edit'} render={() => (
                <EditActivity
                  handleFormChange={this.props.handleFormChange}
                  handleSubmit={(e) => {
                    e.preventDefault();
                    this.props.editActivity();
                    this.setState({ isEdit: false })
                    this.props.history.push(`/activities/${this.props.activityForm.id}`)
                  }}
                  activityForm={this.props.activityForm} />
              )} />
              :
              <>
                <h1>{activity.name}</h1>
                <button onClick={() => {
                  this.setState({
                    isEdit: true
                  })
                  this.props.history.push(`/activities/${activity.id}/edit`)
                }}>Edit</button>
                <button onClick={() => {
                  this.props.deleteActivity(activity.id);
                  this.props.history.push('/')
                }}>Delete</button>
              </>
            }
          </div>)}
      </div>)
  }
}

export default withRouter(ActivitiesView);