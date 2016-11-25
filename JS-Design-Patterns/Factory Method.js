//Factory Methods are frequently used in applications 
//that manage, maintain, or manipulate collections of objects 
//that are different but at the same time have many characteristics 
//(i.e. methods and properties) in common. 

function Factory(){
    this.createEmployee = function(type){
        var employee;
        if(type === 'fulltime'){
            employee = new FullTime();
        }else if(type === 'parttime'){
            employee = new PartTime();
        }else if(type === 'temporary'){
            employee = new Temporary();
        }else if(type === 'contractor'){
            employee = new Contractor();
        }
        employee.type = type;
        employee.say = function(){
            log.add(this.type+':rate'+this.hourly+'/hours');
        }
        return employee;
    }
}

var FullTime = function(){
    this.hourly ="$12";
}

var PartTime = function(){
    this.hourly = "$11";
}

var Temporary = function(){
    this.hourly = "$10";
}

var Contractor = function(){
    this.hourly ="$15";
}

var log = (function(){
    var log="";
    return{
        add:function(msg){log+=msg+'\n';},
        show:function(){alert(log);log="";}
    }
})();

function run(){
    var employee = [];
    var factory = new Factory();
    employee.push(factory.createEmployee('fulltime'));
    employee.push(factory.createEmployee('parttime'));
    employee.push(factory.createEmployee('temporary'));
    employee.push(factory.createEmployee('contractor'));

    for(var i=0, len = employee.length;i<len;i++){
        employee[i].say();
    }
    log.show();
}

run();
