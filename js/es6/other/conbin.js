'use strict';
// getJson('age');
function getJson(key) {
    var jsonObj = { "name": "傅红雪", "age": "24", "profession": "刺客" };
    //1、使用eval方法        
    var eValue = eval('jsonObj.' + key);
    console.log(eValue);
    //2、遍历Json串获取其属性
    for (var item in jsonObj) {
        if (item == key) {        //item 表示Json串中的属性，如'name'
            var jValue = jsonObj[item];//key所对应的value
            console.log(jValue);
        }
    }
    //3、直接获取
    // alert(jsonObj['' + key + '']);
    console.log(jsonObj['' + key + '']);
}

var re = [];
var findSignle = [];
re.push({
    id: 126,
    d_cid: '8de6a950-2b8d-11e6-9bf3-000c296c5f2b',
    d_cname: '内容家',
    caid: 182,
    status: 1
});
re.push({
    id: 124,
    d_cid: 'f4e1d2f6-52de-11e6-9192-000c296c5f2b',
    d_cname: '上海爱数信息技术股份有限公司',
    caid: 236,
    status: 1
});
re.push({
    id: 123,
    d_cid: '9c731a42-74d2-11e6-9afb-000c296c5f2b',
    d_cname: 'compTest11',
    caid: null,
    status: 0
});
re.push({
    id: 112,
    d_cid: '2d437532-3381-11e6-827c-000c296c5f2b',
    d_cname: 'test本地罗青蓉',
    caid: 185,
    status: 1
});

findSignle.push({
    id: "",
    d_cid: '2d437532-3381-11e6-827c-000c296c5f2b',
    d_cname: 'test本地罗青蓉',
    caid: 185,
    status: 1
});
findSignle.push({
    id: "",
    d_cid: '2d437532-3381-11e6-827c-000c296c5f2b',
    d_cname: 'test本地罗青蓉2',
    caid: "",
    status: 1
});


for (let i = 0; i < findSignle.length; i++) {
    let count = 0;
    for (let j = 0; j < re.length; j++) {
        if (re[j]['d_cid'] == findSignle[i]['d_cid']) {
            count++;
        }
    }
    if (count == 0) {
        re.push(findSignle[i]);
    }
}

function check(re, json) {
    let tmp = false;
    for (let i = 0; i < re.length; i++) {
        if (re[i]['d_cid'] == json['d_cid']) {
            tmp = true;
        }
    }
    return tmp;
}
console.log(re);
