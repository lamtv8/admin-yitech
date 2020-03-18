import { FETCH_VIDEO, UPDATE_VIDEO, LOCK_USER } from "../actionType";
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