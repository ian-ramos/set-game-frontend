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
