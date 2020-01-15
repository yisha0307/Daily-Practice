// 返回一个IDBRequest对象
var request = window.indexedDB.open('database1')
request.onerror = function (event) {
    console.log('数据库打开报错')
}

var db
request.onsuccess = function (event) {
    db = request.result
    console.log('数据库打开成功')
}
// 数据库升级事件 (指定的版本号大于数据库的实际版本号)
request.onupgradeneeded = function (event) {
    db = event.target.result
    // 新建对象仓库
    // 新增一张叫person的表格，主键是id
    var objectStore 
    if (!db.objectStoreNames.contains('person')) {
        objectStore = db.createObjectStore('person', {keyPath: 'id'})
    }
    // 新建索引
    // 使用索引的意义在于，可以搜索任意字段，也就是说从任意字段拿到数据记录。
    // params: 索引名称、索引所在的属性、配置对象（说明该属性是否包含重复的值）
    objectStore.createIndex('name', 'name', {unique: false})
    objectStore.createIndex('email', 'email', {unique: true})
}

function add () {
    // 指定表格名称和操作模式（‘只读’或者‘读写’）
    var request = db.transaction(['person'], 'readwrite').objectStore('person').add({id: 1, name: '张三', age: 24, email: 'zhangsan@example.com'})
    request.onsuccess = function (event) {
        console.log('数据写入成功')
    }
    request.onerror = function (event) {
        console.log('数据写入失败')
    }
}

function read () {
    var transaction = db.transaction(['person'])
    var objectStore = transaction.objectStore('person')
    // objectStore.get()方法用于读取数据，参数是主键的值
    var request = objectStore.get(1)

    request.onerror = function (event) {
        console.log('事务失败')
    }
    request.onsuccess = function (event) {
        if (request.result) {
            console.log('Name: ' + request.result.name);
            console.log('Age: ' + request.result.age);
            console.log('Email: ' + request.result.email)
        } else {
            console.log('未获得数据记录')
        }
    }
}

// 遍历数据
function readAll () {
    var objectStore = db.transaction('person').objectStore('person')
    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result
        if (cursor) {
            console.log('Id: ' + cursor.key);
            console.log('Name: ' + cursor.value.name);
            console.log('Age: ' + cursor.value.age);
            console.log('Email: ' + cursor.value.email);
            cursor.continue();
        } else {
            console.log('没有更多数据了！')
        }
    }
}

// 更新数据 - PUT
function update () {
    var request = db.transaction(['person'], 'readwrite').objectStore('person').put({id: 1, name: '李四', age: 35, email: 'lisi@example.com' });
    request.onsuccess = function (event) {
        console.log('数据更新成功');
      };
    
    request.onerror = function (event) {
        console.log('数据更新失败');
    }
}

function remove () {
    var request = db.transaction(['person'], 'readwrite').objectStore('person').delete(1)
    request.onerror = event => {
        console.log('数据删除失败')
    }
    request.onsuccess = event => {
        console.log('数据删除成功')
    }
}

// 封装一下：
const $DB = {
    init() {
        let _this = this;
        let req = indexedDB.open("hb_geocode");
        req.onupgradeneeded = e => {
            let db = req.result;
            /* 
              createObjectStore 相当于创建一个表
              "geo" 相当于表名
              keyPath 索引 primary key 
            */
            let obStore = db.createObjectStore("geo", {
                keyPath: "latlng"
            });  

            // 下面这一段相当于创建表的一些数据结构
            obStore.createIndex("address", "address", { unique: false });
            obStore.createIndex("province", "province", { unique: false });
            obStore.createIndex("district", "district", { unique: false });
            obStore.createIndex("street", "street", { unique: false });
            req.result.close();
        };
    },
    /*
       由于indexDB的操作为异步操作，因此用Promise对象进行包装    一下
    */
    Add(payload) {
        return new Promise((resolve, reject) => {
            let db = indexedDB.open("hb_geocode");
          /* 
              
          */
            db.onsuccess = () => {
                db.result
                    .transaction("geo", "readwrite")
                    .objectStore("geo")
                    .add(payload);
                db.result.close();
                resolve();
            };
            db.onerror = e => {
                reject(e);
            };
        });
    },
    Get(key) {
        return new Promise((resolve, reject) => {
            let db = indexedDB.open("hb_geocode");
            db.onsuccess = () => {
                let req = db.result
                    .transaction("geo", "readonly")
                    .objectStore("geo")
                    .get(key);
                db.result.close();

                req.onsuccess = e => {
                    resolve(e.target.result);
                };
                req.onerror = err => {
                    reject(err);
                };
            };
            db.onerror = e => {
                reject(e);
            };
        });
    }
};