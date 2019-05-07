const baseUrl = 'http://localhost:3000'

export const loginUser = (loginData) => {
  const opts = {
    method: 'POST',
    body: JSON.stringify(loginData),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return fetch(`${baseUrl}/auth/login`, opts)
    .then(resp => resp.json())
}

export const registerUser = (registerData) => {
  const opts = {
    method: 'POST',
    body: JSON.stringify({ user: registerData }),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return fetch(`${baseUrl}/users/`, opts)
    .then(resp => resp.json())
}


const readAllActivities = (user_id) => {
  return fetch(`${baseUrl}/users/${user_id}/activities`)
  // return fetch(`${baseUrl}/activities`)
    .then(resp => resp.json())
}


const createActivity = (user_id, data) => {
  const opts = {
    method: 'POST',
    body: JSON.stringify({ activity: data }),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return fetch(`${baseUrl}/users/${user_id}/activities`, opts)
    .then(resp => resp.json())
}




//  old one below  TUES 2:06PM
// const createActivity = (data) => {
  
//   const opts = {
//     method: 'POST',
//     body: JSON.stringify({ activity: data }),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   }
//   return fetch(`${baseUrl}/activities`, opts)
//     .then(resp => resp.json())
// }
// xxxxxxxxxxxxxxx old one above




const updateActivity = (id, data) => {
  const opts = {
    method: 'PUT',
    body: JSON.stringify({ activity: data }),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return fetch(`${baseUrl}/activities/${id}`, opts)
    .then(resp => resp.json())
}

const destroyActivity = (id) => {
  const opts = {
    method: 'DELETE'
  }
  return fetch(`${baseUrl}/activities/${id}`, opts)
}

export {
  createActivity,
  readAllActivities,
  updateActivity,
  destroyActivity
}
