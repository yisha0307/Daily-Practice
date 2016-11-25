function Employee(name){
    this.name = name;
    this.say = function(){
        log.add('I am employee' +name);
    };
}

function EmployeeFactory(){
    this.create = function(name){
        return new Employee(name);
    };
}

function Vendor(name){
    this.name = name;
    this.say = function(){
        log.add('i am vendor'+name);
    };
}

function VendorFactory(){
    this.create = function(name){
        return new Vendor(name);
    };
}

var log = (function(){
    var log = "";
    return {
        add:function (msg){log+=msg+'\n';},
        show:function(){alert(log); log="";}
    }
})();

function run(){
    var persons = [];
    var employeeFactory = new EmployeeFactory();
    var vendorFactory = new VendorFactory();

    persons.push(employeeFactory.create('Joan D'));
    persons.push(employeeFactory.create('Tim O'));
    persons.push(vendorFactory.create('Garald W'));
    persons.push(vendorFactory.create('Nicole m'));

    for (var i=0,len = persons.length;i<len;i++){
        persons[i].say();
    }
    log.show();
}
run();
