import axios from "axios";

let res = null;
const baseUrl = "http://127.0.0.1:8848/api/auth/login";

export const login = async (email, password) => {
  try {
    res = await axios({
      method: "post",
      url: baseUrl,
      data: {
        email: email,
        password: password
      },
      headers: {
        contentType: "json"
      }
    });

    return res;
  } catch (err) {
    return err;
  }
};
