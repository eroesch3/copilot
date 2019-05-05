import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import decode from 'jwt-decode';

// import ActivitiesView from './components/ActivitiesView';
// import ActivityPage from './components/ActivityPage';
// import CreateActivity from './components/CreateActivity'
import Login from './components/Login'
import Register from './components/Register'

import {
  createActivity,
  readAllActivities,
  updateActivity,
  destroyActivity,
  loginUser,
  registerUser
} from './services/api-helper'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      activityForm: {
        name: "",
        category: ""
      },
      currentUser: null,
      authFormData: {
        username: "",
        email: "",
        password: ""
      }
    };
    this.handleFormChange = this.handleFormChange.bind(this)
    this.mountEditForm = this.mountEditForm.bind(this)
    this.editActivity = this.editActivity.bind(this)
    this.deleteActivity = this.deleteActivity.bind(this)
    this.newActivity = this.newActivity.bind(this)
    this.handleLoginButton = this.handleLoginButton.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.authHandleChange = this.authHandleChange.bind(this)
  }


  // componentDidMount() {
  //   this.getTeachers();
  //   const checkUser = localStorage.getItem("jwt");
  //   if (checkUser) {
  //     const user = decode(checkUser);
  //     this.setState({
  //       currentUser: user
  //     })
  //   }
  // }

  async getActivities() {
    const activities = await readAllActivities();
    this.setState({
      activities
    })
  }

  async newActivity(e) {
    e.preventDefault();
    const activity = await createActivity(this.state.activityForm);
    this.setState(prevState => ({
      activities: [...prevState.activities, activity],
      activityForm: {
        name: "",
        photo: ""
      }
    }))
  }

  async editActivity() {
    const { activityForm } = this.state
    await updateActivity(activityForm.id, activityForm);
    this.setState(prevState => (
      {
        activities: prevState.activities.map(activity => activity.id === activityForm.id ? activityForm : activity),
      }
    ))
  }

  async deleteActivity(id) {
    await destroyActivity(id);
    this.setState(prevState => ({
      activities: prevState.activities.filter(activity => activity.id !== id)
    }))
  }

  handleFormChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      activityForm: {
        ...prevState.activityForm,
        [name]: value
      }
    }))
  }

  async mountEditForm(id) {
    const activities = await readAllActivities();
    const activity = activities.find(el => el.id === parseInt(id));
    this.setState({
      activityForm: activity
    });
  }

  // -------------- AUTH ------------------

  handleLoginButton() {
    this.props.history.push("/login")
  }

  async handleLogin() {
    const userData = await loginUser(this.state.authFormData);
    this.setState({
      currentUser: decode(userData.token)
    })
    localStorage.setItem("jwt", userData.token)
  }

  async handleRegister(e) {
    e.preventDefault();
    await registerUser(this.state.authFormData);
    this.handleLogin();
  }

  handleLogout() {
    localStorage.removeItem("jwt");
    this.setState({
      currentUser: null
    })
  }

  authHandleChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      authFormData: {
        ...prevState.authFormData,
        [name]: value
      }
    }));
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1><Link to='/' onClick={() => this.setState({
            activityForm: {
              name: "",
              category: ""
            }
          })}>Copilot</Link></h1>
          <div>
          {this.state.currentUser
            ?
            <>
              <p>{this.state.currentUser.username}</p>
              <button onClick={this.handleLogout}>logout</button>
            </>
            :
            <button onClick={this.handleLoginButton}>Login/Register</button>
          }
          </div>
        </header>
        <Route exact path="/login" render={() => (
          <Login
            handleLogin={this.handleLogin}
            handleChange={this.authHandleChange}
            formData={this.state.authFormData} />)} />
        <Route exact path="/register" render={() => (
          <Register
            handleRegister={this.handleRegister}
            handleChange={this.authHandleChange}
            formData={this.state.authFormData} />)} />
        <Route
          exact path="/"
          render={() => (
            <ActivitiesView
              activities={this.state.activities}
              activityForm={this.state.activityForm}
              handleFormChange={this.handleFormChange}
              newActivity={this.newActivity} />
          )}
        />
        <Route
          path="/new/activity"
          render={() => (
            <CreateActivity
              handleFormChange={this.handleFormChange}
              activityForm={this.state.activityForm}
              newActivity={this.newActivity} />
          )} />
        <Route
          path="/activities/:id"
          render={(props) => {
            const { id } = props.match.params;
            const activity = this.state.activities.find(el => el.id === parseInt(id));
            return <ActivityPage
              id={id}
              activity={activity}
              handleFormChange={this.handleFormChange}
              mountEditForm={this.mountEditForm}
              editActivity={this.editActivity}
              activityForm={this.state.activityForm}
              deleteActivity={this.deletActivity} />
          }}
        />
      </div>
    );
  }
}

export default withRouter(App);