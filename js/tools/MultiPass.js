//define the multipass method
define(['apiEndPoints'], function(api){
    return {
        getMultiPass:$.post(apiEndPoints,{},function(d){console.log(d)})
    }
})
