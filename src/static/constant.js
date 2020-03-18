// var HOST = "https://capstoneweb.azurewebsites.net";
var HOST = "http://35.240.228.194:8760/service-auth";
var PORT = "";
if (process.env.REACT_APP_ENV === "production") {
  HOST = "http://capstone16.southeastasia.cloudapp.azure.com";
  PORT= ''
}

const API = {
  LOGIN: `${HOST}${PORT}/api/auth/login/admin`,
  CHECK_TOKEN: `${HOST}${PORT}/api/v1/users/current_user/`,
  GET_IMAGE: `http://34.87.12.194/api/admin/users`,
  GET_VIDEO_LIST:`${HOST}${PORT}/api/v1/videos/`,
  GET_STREAM: `${HOST}${PORT}/api/v1/stream`
};

const LEVEL_WARNING = {
  LOW:"Quan ngại sâu sắc",
  MIDDLE: "Nguy hiểm",
  HIGHT: "Nguy hiểm cao"  
}
export {
    API,
    LEVEL_WARNING
}