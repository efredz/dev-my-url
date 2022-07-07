chrome.runtime.onInstalled.addListener(function(details) {
    if(details.reason == "install") {
        console.log("first install");
        chrome.storage.sync.set({"active": false});
    } else {
        console.log("no la primera")

    }
});

let active = false;
chrome.storage.sync.get(["active"], function(result) {
    active = result;
console.log(`se leyó!`);
})
console.log(`active = ${active}`);


function onUpdated(tab) {
    console.log(`Updated tab: ${tab.id}`);
}
  
function onError(error) {
    console.log(`Error: ${error}`);
}

chrome.action.onClicked.addListener(function() {
    console.log("clicked");
    active = !active;
    if(active) {
        console.log("estamos activos, actualizamos la url");
        changeDevBar();
    }
    console.log("no hacemos nada porque estamos inactivos :(");
    
})

function changeDevBar() {
    chrome.tabs.query({active: true}, (tab) => redirectToDev(tab[0]))
}

  
redirectToDev = (tab) => {
    console.log("tab");
    console.log(tab);
    console.log(tab.url);
    const url = new URL(tab.url);
    const host = url.host;
    console.log("host");
    console.log(host);
    url.host = url.host.replace("wwww", "dev");
    url.port = 8443;
    console.log(url);
    let updating = chrome.tabs.update({url: url});
    updating.then(onUpdated, onError);
}
