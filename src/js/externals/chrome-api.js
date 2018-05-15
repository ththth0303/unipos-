class ChromeAPI {
    constructor() {
        console.log('va0f');
        
    }

    getUrl() {
        let url = '';
        chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
            url = tabs[0].url;   
        });
        return url;
    }
}

var api = new ChromeAPI()
export default api;