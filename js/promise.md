[^]: 

```javascript
const [A, B, C, D] = [
    'PromiseA',
    'PromiseB',
    'PromiseC',
    'PromiseD'
]

const print = console.log
// const Promise = require('bluebird')

var pA = (vA) => {
    return new Promise((resolve, reject) => {
        if (vA === A) {
            resolve(B)
        } else {
            reject('NO A')
        }
    })
}

var pB = (vB) => {
    return new Promise((resolve, reject) => {
        if (vB === B) {
            resolve(B)
        } else {
            reject('NO B')
        }
    })
}

var pC = (vC) => {
    return new Promise((resolve, reject) => {
        if (vC === B) {
            resolve('final success')
        } else {
            reject('NO C')
        }
    })
}

/**
 * 链式调用，最后的catch统一处理错误
 */
var final = pA(A)
.then(res => {
    return res
})
.then(resB => {
    return pB(resB)
    .then(res => {
        return res
    })
})
.then(resC => {
    return pC(resC)
    .then(res => {
        return res
    })
})
.catch(err => {
    return Promise.reject(err)
})

final.then(res => {
    console.log('success: ' + res)
}, err => {
    console.log('faliure: ' + err)
})

```

