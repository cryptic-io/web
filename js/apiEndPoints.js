// Define the api end points to be used throughout the code
define(['config'], function(config) {
  // check if a server root is defined. default to same host if it's not.
  var serverRoot = (!_.isUndefined(config.serverRoot)) ? config.serverRoot : "";
  return {
      updateUserBlob :   serverRoot + "/api/updateUserBlob"
    , createUser     :   serverRoot + "/api/createUser"
    , getUserBlobs   :   serverRoot + "/api/getUserBlobs"
    , getFileKeys    :   serverRoot + "/api/getFileKeys"
    , uploadFile     :   serverRoot + "/api/uploadFile"
    , anonUploadFile :   serverRoot + "/api/anonUploadFile"
    , removeFile     :   serverRoot + "/api/removeFiles"
    , multipass      :   serverRoot + "/api/getMultipass"
    , emailSubscribe :   serverRoot + "/api/emailSubscribe"
  }
})
