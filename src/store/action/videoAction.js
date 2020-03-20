import { FETCH_VIDEO, UPDATE_VIDEO, LOCK_WEB } from "../actionType";
import { convertUTCDate, formatDateTime } from "../../common/utilities";

import { API } from "../../static/constant";
import { httpService } from "../../common/httpService";
import { activate } from "video-react/lib/actions/player";

export const updateVideos = (
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
      type: FETCH_VIDEO,
      payload: null
    });
    var query = `${API.GET_VIDEO_LIST}`;
    httpService
      .get(query)
      .then(res => {
        var data = res.data.map(item => {
          var timestamp = item.createdAt*1000;
          console.log(timestamp)
        return {
            id: item.webID,
            url: item.webUrl,
            createdAt: new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp),
            author: item.authorName,
            buttonType: item.removed ?  "danger" : "primary" ,
            buttonTitle: item.removed ?  "Disable" :  "Enable",
            removed: item.removed,          
            
          }
        })
        dispatch({
          type: UPDATE_VIDEO,
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

export const lockWeb = (
  webId,
  lock,
  callbackSuccess = undefined,
   callbackFail = undefined
 ) => {
   return dispatch => {
    
     dispatch({
       type: FETCH_VIDEO,
       payload: null
     });
     var query = `${API.PUT_LOCK_WEB}`;
     httpService
       .put(query, {
         "id": webId,
         "locked": lock
       })
       .then(res => {
         dispatch(updateVideos());
         // console.log(res.data);
         dispatch({
           type: LOCK_WEB,
           payload: {
             data: [...res.data]
           }
         });
       
         if (callbackSuccess !== undefined) callbackSuccess();
       })
       .catch(err => {
         if (callbackFail !== undefined) callbackFail();
       });
   };
 };