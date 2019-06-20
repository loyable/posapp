import { store } from "../../store";

import settings from "../../config/settings";

//Patch device info to API
export const SET_DEVICE = (userID, device, callback) => {
  const { id, token } = userID;

  return function(dispatch) {
    fetch(
      `${settings.url.api}/users/${id}/device`,
      {
        os: device.os,
        token: device.token
      },
      {
        headers: { Authorization: "Bearer " + token }
      }
    ).then(res => {
      if (res.data.hasOwnProperty("id")) {
        if (callback) callback();
      }
    });
  };
};
