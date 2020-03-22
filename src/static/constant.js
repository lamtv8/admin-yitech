// var HOST = "https://capstoneweb.azurewebsites.net";
var HOST = "http://35.240.228.194:8760/service-auth";
var PORT = "";
if (process.env.REACT_APP_ENV === "production") {
  HOST = "http://35.240.228.194:8760/service-auth";
  PORT= ''
}

const API = {
  LOGIN: `${HOST}${PORT}/api/auth/login/admin`,
  CHECK_TOKEN: `${HOST}${PORT}/api/v1/users/current_user/`,
  GET_USER_LIST: `http://35.240.228.194:8760/service-user/api/admin/users`,
  GET_WEB_LIST:`http://35.240.228.194:8760/service-user/api/admin/websites`,
  PUT_LOCK_USER: `http://35.240.228.194:8760/service-user/api/admin/user/lock`,
  PUT_LOCK_WEB: `http://35.240.228.194:8760/service-user/api/admin/website/lock`,
  GET_USER_DETAIL:`http://35.240.228.194:8760/service-user/api/admin/ors-and-webs`,
};


export {
    API,
}