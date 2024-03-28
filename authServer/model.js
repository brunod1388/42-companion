module.exports = {
  getAccessToken: accessToken => {
    // your code to get the access token from the database
  },
  getRefreshToken: refreshToken => {
    // your code to get the refresh token from the database
  },
  getClient: (clientId, clientSecret) => {
    // your code to get the client from the database
  },
  getUser: (username, password) => {
    // your code to get the user from the database
  },
  saveToken: (token, client, user) => {
    // your code to save the token
  }
};
