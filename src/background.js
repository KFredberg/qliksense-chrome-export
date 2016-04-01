// ID to manage the context menu entry
var cmid = 'kdgcphgpempfodifmhdmhlkgilbiijff';

// Register context menu
chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        "id": cmid,  // Required for event pages
        "title": "Copy selected text to clipboard",
        "contexts": ["page"],
        // "onclick" : ...  // Removed in favor of chrome.contextMenus.onClicked
    });

});

// Register a contextmenu click handler.
chrome.contextMenus.onClicked.addListener(copyToClipboard);

function updateBackgroundPageAndCopy(contentToCopy) {
    //console.log('Class of element is: ' + contentToCopy);
    var tempNode = document.getElementById("textarea");
    tempNode.value = contentToCopy; // <-- Selected text
    tempNode.select();
    document.execCommand('copy', false, null);
}

function copyToClipboard(info, tab) {
    chrome.tabs.sendMessage(tab.id, {text: 'get_element'}, updateBackgroundPageAndCopy);
    chrome.extension.getBackgroundPage().console.log(info);
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.request === 'updateContextMenu') {
        var type = msg.selection;
        type = type.length > 13 ? type.substring(0, 13).concat("...") : type; 
        var options = {
            title: 'Copy "' + type + '"',
            contexts: ['page']
        };
        chrome.contextMenus.update(cmid, options);
    }
});
