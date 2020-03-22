import { httpService } from "../../common/httpService";
import { API } from "../../static/constant";
import { FETCH_VIDEO, LOCK_WEB, UPDATE_VIDEO } from "../actionType";
import { getUser } from "./UserListAction";


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
    var query = `${API.GET_WEB_LIST}`;
    httpService
      .get(query)
      .then(res => {
        var data = res.data.map(item => {
          var timestamp = item.createdAt*1000;
        return {
            id: item.webID,
            url: item.webUrl,
            userId:item.authorID,
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
  userId,
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
         if(!!userId){
          dispatch(getUser(userId));
         }
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