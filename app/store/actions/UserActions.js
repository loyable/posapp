import { store } from "../../store";

import settings from "../../config/settings";

//Persist to state user data
export const SET_ACTIVE_CARD = card => {
  return {
    type: "SET_ACTIVE_CARD",
    payload: card
  };
};

//Persist to state user data
export const LOAD_USER = user => {
  return {
    type: "LOAD_USER",
    payload: user
  };
};

//Persist to state user data
export const LOAD_MERCHANT = merchant => {
  return {
    type: "LOAD_MERCHANT",
    payload: merchant
  };
};

//Persist to state user data
export const SET_MERCHANT_ID = merchantID => {
  return {
    type: "SET_MERCHANT_ID",
    payload: merchantID
  };
};

//Fetch user from API
export const REQUEST_USER = (userID, callback) => {
  return function(dispatch) {
    const state = store.getState(),
      { id, token } = state.user.merchantID;

    // const headers = new Headers({
    //   Authorization: `Bearer ${token}`
    // });

    fetch(`${settings.url.api}/merchants/${id}/users/${userID}`)
      .then(res => res.json())
      .then(user => {
        if (user.hasOwnProperty("user")) {
          dispatch(LOAD_USER(user.user));
          if (callback) callback(user);
        } else {
          if (callback) callback(user);
        }
      })
      .catch(() => {
        setTimeout(() => dispatch(REQUEST_USER(userID)), 2000);
      });
  };
};

//Fetch merchant from API
export const REQUEST_MERCHANT = callback => {
  return function(dispatch) {
    const state = store.getState(),
      { id, token } = state.user.merchantID;

    // const headers = new Headers({
    //   Authorization: `Bearer ${token}`
    // });

    fetch(`${settings.url.api}/merchants/${id}`)
      .then(res => res.json())
      .then(merchant => {
        if (merchant.hasOwnProperty("id")) {
          fetch(`${settings.url.api}/merchants/${id}/users`)
            .then(res => res.json())
            .then(stats => {
              dispatch(LOAD_MERCHANT({ ...merchant, stats }));
              if (callback) callback({ ...merchant, stats });
            });
        } else {
          if (callback) callback(merchant);
        }
      })
      .catch(() => {
        setTimeout(() => dispatch(REQUEST_MERCHANT()), 2000);
      });
  };
};
