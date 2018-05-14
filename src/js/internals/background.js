import $ from "jquery";

function makeRequest(type, member_id) {
    return new Promise(function (resolve, reject) {
        let data = {
            "jsonrpc": "2.0",
            "method": "Unipos.GetCards2",
            "params": {
                "offset_card_id": "", "count": 5000
            },
            "id": "Unipos.GetCards2"
        };
        switch (type) {
            case 'clapped':
                data.params.praised_member_id = member_id;
                break;

            case 'received':
                data.params.from_member_id = member_id;
                break;

            case 'sent':
            default:
                data.params.to_member_id = member_id;
                break;
        }
        data = JSON.stringify(data);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://unipos.me/q/jsonrpc");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("x-unipos-token", "7226a66a-5660-4714-916f-aad8abc39268");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(JSON.parse(xhr.response).result);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send(data);
    });
}

// Example:

async function getPoint(member_id = 'b08d3b24-0ce7-4b8a-aaf2-e1dad1bee0d3') {


    let sent = makeRequest('sent', member_id);
    let received = makeRequest('received', member_id);
    let clapped = makeRequest('clapped', member_id);

    let sumReceive = 0;
    let sumSent = 0;
    await Promise.all([sent, received, clapped]).then((value) => {
        for (let index = 0; index < value[0].length; index++) {
            sumReceive += value[0][index].point + value[0][index].praise_count;
        }
        for (let index = 0; index < value[1].length; index++) {
            sumReceive += value[1][index].praise_count;
            sumSent += value[1][index].point;
        }
        for (let index = 0; index < value[2].length; index++) {
            sumSent += value[2][index].praise_count * 2;
        }
        console.log(sumReceive, sumSent);
    });
}

getPoint();
$(document).ready(function() {
    setTimeout(() => {
        $('.ownProfile_displayName').bind("DOMSubtreeModified", function () {
            alert('changed');
        });    
    }, 2000);
    
})