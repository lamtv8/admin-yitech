import { FETCH_IMAGE, UPDATE_IMAGE, LOCK_USER, GET_USER } from "../actionType";
import { convertUTCDate, formatDateTime } from "../../common/utilities";

import { API } from "../../static/constant";
import { httpService } from "../../common/httpService";
import { activate } from "video-react/lib/actions/player";

export const updateImages = (
  fromDate,
  toDate,
  pagination,
  min = undefined,
  max = undefined,
  callbackSuccess = undefined,
  callbackFail = undefined
) => {
  return dispatch => {
    dispatch({
      type: FETCH_IMAGE,
      payload: null
    });
    var query = `${API.GET_IMAGE}`;
    httpService
      .get(query)
      .then(res => {
        var data = res.data.map(item => {
          return {
            id: item.userId,
            name: item.fullName,
            email: item.email,
            description:
              '',
            createdBy: '',
            createdAt: new Date(
              new Date().getTime() - Math.round(Math.random() * 1000000000000),
            ).toLocaleDateString(),
            views: Math.round(Math.random() * 10000),
            buttonType: item.actived ? "primary" : "danger",
            buttonTitle: item.actived ? "Enable" : "Disable",
            actived: item.actived
          }

        })
        dispatch({
          type: UPDATE_IMAGE,
          payload: {
            data: {
              results: [...data]
            }
          }
        });
        if (callbackSuccess !== undefined) callbackSuccess();
      })
      .catch(err => {
        if (callbackFail !== undefined) callbackFail();
      });
  };
};

export const lockUser = (
 userId,
 lock,
 callbackSuccess = undefined,
  callbackFail = undefined
) => {
  return dispatch => {
   
    dispatch({
      type: FETCH_IMAGE,
      payload: null
    });
    var query = `${API.PUT_LOCK_USER}`;
    httpService
      .put(query, {
        "id": userId,
        "locked": lock
      })
      .then(res => {
        dispatch(updateImages());
        // console.log(res.data);
        var result = res.data
        dispatch({
          type: LOCK_USER,
          payload: {
            data: result
          }
        });
      
        if (callbackSuccess !== undefined) callbackSuccess();
      })
      .catch(err => {
        if (callbackFail !== undefined) callbackFail();
      });
  };
};

export const getUser = (
  userId,
  callbackSuccess = undefined,
   callbackFail = undefined
 ) => {
   return dispatch => {
    
     dispatch({
       type: FETCH_IMAGE,
       payload: null
     });
     var query = `${API.GET_USER_DETAIL}`;
     httpService
       .get(`${query}?userID=${userId}`)
       .then(res => {
        var result = res.data
         dispatch({
           type: GET_USER,
           payload: {
             data: result
           }
         });
       
         if (callbackSuccess !== undefined) callbackSuccess();
       })
       .catch(err => {
         if (callbackFail !== undefined) callbackFail();
       });
   };
 };