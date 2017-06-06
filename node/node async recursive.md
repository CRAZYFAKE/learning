问题：递归遍历部门下的所有子部门，子部门下的子部门。

解决：如下

```javascript
var config = require("./config/config.js").config();

runSql = function(sql) {
    return new Promise(function(resolve, reject) {
        var mysql = require('mysql');
        var conn = mysql.createConnection({
            host: config['anysharedb_address'],
            user: config['anysharedb_name'],
            password: config['anysharedb_password'],
            database: config['anysharedb_base'],
            port: config['anysharedb_port']
        });
        conn.connect();
        conn.query(sql, function(qerr, vals, fields) {
            conn.end();
            if (qerr) {
                if (debug) {
                    throw qerr;
                } else {
                    resolve(qerr)
                }
            } else {
                resolve(vals)
            }
        });
    })
}

/**
 * 一个部门下的子部门
 * @param departmentId 部门id
 */
getDepartment = (departmentId) => {
    return new Promise((resolve, reject) => {
        let sql = `select A.f_department_id,B.f_name from t_department_relation AS A,t_department AS B where A.f_parent_department_id = "${departmentId}" AND A.f_department_id = B.f_department_id`;
        runSql(sql).then((departs) => {
            resolve(departs);
        });
    });
}

/**
 * 递归获取父部门下的子部门
 * @param departmentId 部门id
 * @param result       返回结果
 * @param stack        父部门集合
 * @param callback     回调函数
 */
getDepartments = (departmentId, result, stack, callback) => {
    getDepartment(departmentId).then(values => {
        stack.delete(departmentId);
        values.forEach((depart) => {
            result.push([depart["f_department_id"], depart['f_name']]);
            stack.add(depart["f_department_id"]);
            getDepartments(depart.f_department_id, result, stack, callback);
        });
        if (stack.size == 0) {
            stack = null;
            callback(result);
        }
    });
}

let cid = 'd334258e-c726-11e6-a0e2-000c296c5f2b',
    cid1 = 'f6c27394-c725-11e6-b1ad-000c296c5f2b';

getDepartments(cid1, [], new Set(), (result) => {
    console.log(result);
});
```

