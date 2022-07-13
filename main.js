const noop = () => { };

chrome.action.onClicked.addListener(function () {
    changeDevBar();
})

function changeDevBar() {
    chrome.tabs.query({ active: true }, (tab) => redirectToDev(tab[0]))
}

redirectToDev = (tab) => {
    const url = new URL(tab.url);
    url.port = 8443;
    url.host = url.host.replace("www", "dev")
    chrome.tabs.update({ url: url.toString() }).then(noop, noop);
}
