
var sharedMomentsArea=document.getElementById('shared-moments');
const chatForm=document.querySelector('#chat-form');


const socket = io();

socket.on('message', function(message){
  console.log(message);
  // clearCards();
  outputMessage(message);

  sharedMomentsArea.scrollTop=sharedMomentsArea.scrollHeight;

})

chatForm.addEventListener('submit', function(event){
  event.preventDefault();

  let msg=event.target.elements.msg.value;
    console.log("msg"+msg);

    msg=msg.trim();

    if(!msg){
        return false;
    }

    var msgObj={
        msg:msg,
        to:"UnNamed User"
    }

    socket.emit('chatMessage', msgObj);

    event.target.elements.msg.value = '';
    // event.target.elements.msg.focus();

})


function outputMessage(message) {
  var msgWrapper = document.createElement('div');
  msgWrapper.className = 'message-container';
  var msgTitle = document.createElement('div');
  msgWrapper.appendChild(msgTitle);
  var msgTitleTextElement = document.createElement('h5');
  msgTitleTextElement.style.color = 'black';
  msgTitleTextElement.className = 'message-title';
  msgTitleTextElement.textContent = "from - "+message.username+" - "+message.time;
  msgTitle.appendChild(msgTitleTextElement);
  var msgSupportingText = document.createElement('div');
  msgSupportingText.className = 'message-body';
  msgSupportingText.textContent = message.body;
  msgSupportingText.style.fontSize='20px';
  msgWrapper.appendChild(msgSupportingText);
  sharedMomentsArea.appendChild(msgWrapper);

}

// function updateUI(data, len) {
//   clearCards();
//   for (var i = 0; i < len; i++) {
//       console.log("Data[i]: " + data[i])
//       outputMessage(data[i]);
//   }
// }


function clearCards() {
  while (sharedMomentsArea.hasChildNodes()) {
      sharedMomentsArea.removeChild(sharedMomentsArea.lastChild);
  }
}
