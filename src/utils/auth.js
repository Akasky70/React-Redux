const ACCESS_TOKEN = "access_token";
const USER_INFO = "name";

const auth = {
  // TO GET STORED TOKEN
  get(key) {
    if (localStorage && localStorage.getItem(key)) {
      return localStorage.getItem(key) || null;
    }

    if (sessionStorage && sessionStorage.getItem(key)) {
      return sessionStorage.getItem(key) || null;
    }

    return null;
  },

  // FUNCTION THAT CALLS GET TO GET STORED TOKEN
  getToken(tokenKey = ACCESS_TOKEN) {
    return auth.get(tokenKey);
  },

  // FUNCTON THAT SAVES TOKEN LOCALLY TO AUTHENTICATE USERS
  authenticate(userCredentisls) {
    console.log(userCredentisls);

    localStorage.setItem("id", userCredentisls.data.userData.id);
    localStorage.setItem("name", userCredentisls.data.userData.name);
    localStorage.setItem(
      "access_token",
      userCredentisls.data.token.accessToken
    );
    localStorage.setItem(
      "refresh_token",
      userCredentisls.data.token.refreshToken
    );
  },

  // SETTING NEW ACCESS TOKEN AND REFRESH TOKEN
  setNewTokens(tokens) {
    localStorage.setItem("access_token", tokens.data.newAccessToken);
    localStorage.setItem("refresh_token", tokens.data.newRefreshToken);
  },

  // GET USER DETAILS
  getUserDetails(infoKey = USER_INFO) {
    return auth.get(infoKey);
  },

  // CLEARS THE TOKENS FROM STORAGE
  clear(key) {
    if (localStorage && localStorage.getItem(key)) {
      return localStorage.removeItem(key);
    }

    if (sessionStorage && sessionStorage.getItem(key)) {
      return sessionStorage.removeItem(key);
    }

    return null;
  },

  // CALLS CLEAR TO CLEAR TOKENS WHILE SIGNOUT
  clearToken(tokenKey = ACCESS_TOKEN) {
    return auth.clear(tokenKey);
  }
};

export default auth;
