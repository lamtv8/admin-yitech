import { FETCH_IMAGE, UPDATE_IMAGE } from "../actionType";
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
    // if (fromDate === undefined || toDate === undefined) {
    //    toDate = new Date();
    //    fromDate = new Date();
    //    fromDate.setDate(toDate.getDay() - 10);
    // }
    // toDate = convertUTCDate(toDate);
    // fromDate = convertUTCDate(fromDate);

    var query = `${API.GET_IMAGE}`;
    // var queryDate = `minDate=${formatDateTime(fromDate)}&maxDate=${formatDateTime(toDate)}&page=${pagination}`;
    // var queryRange =  "";
    // query = query + "?"+ queryDate;
    // if(min !== undefined && max === undefined){
    //   queryRange = `&minAge=${min}&maxAge=${100}`;
    //   query = query + queryRange;
    // }else if ( max !== undefined && min === undefined){
    //   queryRange = `&maxAge=${max}&minAge=${1}`;
    //   query = query + queryRange;
    // }else if(min !== undefined && max !== undefined){
    //   queryRange = `&maxAge=${max}&minAge=${min}`;
    //   query = query + queryRange;
    // }
    httpService
      .get(query)
      .then(res => {
        // console.log(res.data);
        debugger
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
            buttonType: item.activated ? "primary" : "danger",
            buttonTitle: item.activated ? "Enable" : "Disable"
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
