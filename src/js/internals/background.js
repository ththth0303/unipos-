import $ from 'jquery';
import axios from 'axios';

const count = 500;
function makeRequest(type, member_id, offset_card_id) {
    return new Promise(function (resolve, reject) {
        let data = {
            "jsonrpc": "2.0",
            "method": "Unipos.GetCards2",
            "params": {
                offset_card_id,
                count,
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

        axios({
            "url": "https://unipos.me/q/jsonrpc",
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "x-unipos-token": localStorage['authnToken'],
            },
            data
        }).then(response => {
            resolve(response.data.result);
        }).catch(error => {
            reject(error)
        });
    });
}

async function getReceived(type, member_id) {
    let sent = {point: 0, clap: 0, time: 0};
    let offset_card_id = '';
    while (true) {
        let result = await makeRequest(type, member_id, offset_card_id);
        offset_card_id = result.length > 0 && result[result.length -1].id;
        for (const key in result) {
            sent.point += result[key].point;
            sent.clap += result[key].praise_count;
            sent.time++;
        }
        if (result.length < count) {
            return sent;
        }
    }
}

async function getPoint(member_id) {
    let sent = getReceived('send', member_id);  
    let received = getReceived('received', member_id);
    let clapped = getReceived('clapped', member_id);

    let sumReceive = 0;
    let sumSent = 0;
    await Promise.all([sent, received, clapped]).then((value) => {
        sumReceive = value[0].point + value[0].clap + value[1].clap;
        sumSent = value[1].point + value[2].clap*2;
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
                clearInterval(itv);
            }
        }, 100);
    });
}

chrome.runtime.onMessage.addListener(function (params) {
    console.log(params);
    if (params.message === 'get point') {
        getPoint(params.id);
    }
    
})

chrome.runtime.sendMessage({ message: "get point" });
