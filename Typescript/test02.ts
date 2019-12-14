// js
class Animal {
    constructor (name) {
        this.name = name
    }
    sayHi () {
        return `my name is ${this.name}`
    }
}

class Cat extends Animal {
    constructor(name){
        super(name) // 调用父类的constructor(name)
        console.log(this.name)
    }
    sayHi() {
        return 'Meow, ' + super.sayHi() // 调用父类的sayHi()
    }
}

// ts
// 有public/private/protected三种访问修饰符
class Animal1 {
    // 如果是private name就无法存取
    public name;
    public constructor(name) {
        this.name = name
    }
}
let a = new Animal1('Jack')
console.log(a.name) // Jack
a.name = 'Tom'
console.log(a.name)  // Tom

class Animal2 {
    public name;
    private constructor(name) {
        this.name = name
    }
}
class Cat2 extends Animal2 {
    // 因为animal2的constructor是private, 该类不允许被继承或者实例化
    // 如果是protected的constructor只允许被继承，不允许被实例化，就是不能写new Animal2
    constructor (name) {
        super(name)
    }
}

// abstract: 抽象类是不能直接实例化的
abstract class Animal3 {
    public name: string;
    public constructor(name: string){
        this.name = name;
    }
    public abstract sayHi(): void;
}
// error: cannot create an instance of an abstract class
let a = new Animal3('Jakc')
class Cat3 extends Animal3 {
    public eat(): void {
        console.log(`${this.name} is eating`)
    }
}
// error: does not implement inherited abstract member 'sayHi' from Animal3
let b = new Cat3('tom')

class Rabbit extends Animal3 {
    public sayHi(): void {
        console.log(`hello, ${this.name}`)
    }
}
// nothing wrong
let r = new Rabbit('bb')