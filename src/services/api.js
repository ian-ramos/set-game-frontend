const apiUrl = 'http://localhost:3000/api/v1'

export const loginUser = (userObj) => {
  const bodyString = JSON.stringify({user: userObj})
  return fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: bodyString
  })
    .then(res => res.json())
}

export const signupUser = (userObj) => {
  const bodyString = JSON.stringify({user: {
    name: userObj.name,
    password: userObj.password,
    password_confirmation: userObj.pwConfirmation
  }})
  return fetch(`${apiUrl}/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: bodyString
  })
    .then(res => res.json())
}

export const getUserWithJwt = () => {
  return fetch(`${apiUrl}/users/jwt`, {
    method: "POST",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
    }
  })
    .then(res => res.json())
}

export const postHighScore = (userObj) => {
  console.log(userObj, "from services");
  const bodyString = JSON.stringify({user: userObj})
  return fetch(`${apiUrl}/users/${userObj.id}`,{
    method: "PATCH",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: bodyString
  })
    .then(res => res.json())
}

export const getHighScores = () => {
  return fetch(`${apiUrl}/scores`)
    .then(res => res.json())
}
