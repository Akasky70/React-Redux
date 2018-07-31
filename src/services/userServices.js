import * as http from "../utils/http";

let res = null;
const segment = "users/";

export const signupUser = async userDetails => {
  try {
    let data = {
      name: userDetails.name,
      email: userDetails.email,
      password: userDetails.password,
      is_active: "1"
    };

    res = await http.post(segment, data);

    return res;
  } catch (err) {
    return err;
  }
};
