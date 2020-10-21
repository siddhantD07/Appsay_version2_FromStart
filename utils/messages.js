

const moment=require('moment');


function formatMessage(username, body){
    return {
        username:username,
        body:body,
        time:moment().format('h:mm a')
    };

}

module.exports=formatMessage;