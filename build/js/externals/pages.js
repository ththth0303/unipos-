function makeRequest(type, member_id) {
    return new Promise(function (resolve, reject) {
        let data = {
            "jsonrpc": "2.0",
            "method": "Unipos.GetCards2",
            "params": {
                "offset_card_id": "",
                "count": 6969
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
        xhr.setRequestHeader("x-unipos-token", '7031e477-af69-4f49-9b39-a2d7c9f2bfcb');
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(JSON.parse(xhr.response).result);
                console.log(xhr.response);
                
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
        console.log(value);
        
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

        let html = `<div style="padding-left: 25px">Cumulative: <span class="sidePoint_total-num" style="margin-right: 15px;color: blue" > ${sumReceive}</span>    Sent:<span class="sidePoint_total-num" style="color:red"> ${sumSent}</span></div>`
        let html1 = `<div class="ownProfile_groups">Cumulative: <span class="sidePoint_total-num" style="margin-right: 15px;color: blue" >  ${sumReceive}</span>    Sent:<span class="sidePoint_total-num" style="color:red"> ${sumSent}</span></div>`
        let itv = setInterval(() => {
            if ($('.ownProfile_right').length) {
                if ($('.ownProfile_groups').length) {
                    $('.ownProfile_groups').append(html);
                } else {
                    $('.ownProfile_right').append(html1);
                }
                // $('.ownProfile_groups').html(sumReceive);
                clearInterval(itv);
            }
        }, 100);
    });
}
getPoint();