// Listen for messages
var clicked_element = null;

document.addEventListener('mousedown', function(event){
  if (event.button == 2) {
        //console.log( event.target);
        //console.log( $(event.target).attr("title"));
        clicked_element = $(event.target).attr("title");
        if (clicked_element == undefined) {
            console.log('Trying to get text');
            clicked_element = $(event.target).text();
        }
        chrome.runtime.sendMessage({
        request: 'updateContextMenu',
        selection: clicked_element
    });
    }
}, true
);

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // If the received message has the expected format...
    console.log(msg.text)
    if (msg.text === 'get_element') {
        // Call the specified callback, passing
        // the web-page's DOM content as argument
        sendResponse(clicked_element);
    }
});