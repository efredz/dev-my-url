chrome.action.onClicked.addListener(function() {
    changeDevBar();
})

function changeDevBar() {
    chrome.tabs.query({active: true}, (tab) => redirectToDev(tab[0]))
}

function onUpdated(tab) {
    console.log(`Updated tab: ${tab.id}`);
}

function onError(error) {
    console.log(`Error: ${error}`);
}

redirectToDev = (tab) => {
    const url = new URL(tab.url);
    const host = url.host;
    url.host = url.host.replace("wwww", "dev");
    url.port = 8443;
    console.log(url.toString());
    let updating = chrome.tabs.update({url: url.toString()});
    updating.then(onUpdated, onError);
}
