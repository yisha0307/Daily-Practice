interface Person {
    name: string;
    // ?表示可选属性
    age?: number;
    // 允许有任意的属性（但是还不能添加)
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
}

interface Employee {
    // 只读属性
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let lily: Employee = {
    id: 89757,
    name: 'lily',
    age: 20,
    gender: 'female'
}

// enum 枚举
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
// 枚举成员会被赋值为从0开始递增的数字
// 前面的有手动赋值，后面的就会自动加1递增
console.log(Days["Sun"] === 0);  // true
console.log(Days["Mon"] === 1);  // true
console.log(Days['Tue'] === 2);  // true

console.log(Days[0] === "Sun");  // true
console.log(Days[1] === 'Mon');  // true
console.log(Days[2] === 'Tue');  //true

// 常数枚举 (const)
const enum Directions {
    Up,
    Down,
    Left,
    Right
}
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]
