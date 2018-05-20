import api from "./chrome-api";

let url = '';
let userId = '';

chrome.tabs.onUpdated.addListener(function () {
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
        if (url !== tabs[0].url) {
            url = tabs[0].url;
            let matches = url.match(/https:\/\/unipos.me\/.*?i=(.*)/);
            if (matches !== null && matches[1] && matches[1] !== userId) {
                userId = matches[1];
                chrome.tabs.sendMessage(tabs[0].id, { message: "get point", id: matches[1]});
            }
        }
    });
})

chrome.runtime.onMessage.addListener(function (params) {
    console.log(params);
    if (params.message === 'get point') {
        chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
        url = tabs[0].url;
        let matches = url.match(/https:\/\/unipos.me\/.*?i=(.*)/);
        if (matches !== null && matches[1]) {
            userId = matches[1];
            chrome.tabs.sendMessage(tabs[0].id, { message: "get point", id: matches[1] });
        }
    })
    }
})
