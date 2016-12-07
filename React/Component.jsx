//Example 1
function Welcome(props){
  return <h1>Hello, {props.name}</h1>;
}

function App(){
  return(
    <div> 
      <Welcome name='Sara'/>
      <Welcome name='yisha'/>
      <Welcome name ='allison'/>
    </div>  //react的components的return必须是一个root element。所以要用<div>包起来
  );
}

ReactDOM.render(
<App/>,document.getElementById('root'));

//Example 2
function Comment(props) { //这个props接受author(an object)/text(string)/date (date) as props
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
//上面这个example可以转化成以下：
function Comment(props) {
  return (
    <div className="Comment">
     <UserInfo user ={props.author}/> 
<!--   用下面的UserInfo -->
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}

function Avatar(props){
  return (
    <img className='Avatar' src={props.user.avatarUrl} alt = {props.user.name} />
  );
}

function UserInfo(props){
  return(
    <div className ='UserInfo'>
      <Avatar user = {props.user}/>
      <div className = 'UserInfo-name'>
        {props.user.name}
      </div>
      </div>
  )
}

//example 3,一个刷新时间的小组件
//原始写法
const root = document.getElementById('root');
function tick(){
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleString()}.</h2>
    </div>
  );
  ReactDOM.render(element,root);
}
setInterval(tick,1000);
//可以换成class的方法:
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(), //用箭头函数的话this不会有指代的问题，会指向clock
      1000
    );
  }

  componentWillUnmount() { //如果要remove这个clock用componentWillUnmount方法
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
