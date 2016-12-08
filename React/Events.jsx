//example 1
function ActionLink(){
  function handleClick(e){
    e.preventDefault();   //reactJS里不能用reture false,一定要用event.preventDefault();
    console.log('The link was clicked.');
  }
  return (
    <a href ="#" onClick = {handleClick}> 
<!--       传统的DOM写法:<a href="#" onclick = 'handleClick()'>
      react的区别：事件是驼峰写法，而不是全小写；指针而非函数；要用花括号 -->
      Click me
      </a>
  );
}
ReactDOM.render(
<ActionLink/>,
document.body);


//example 2 做一个按一下可以toggle on&off的button
class Toggle extends React.Component{
  constructor(props){
    super(props);
    this.state = {isToggleOn:true};//state用来定义initial state
    
    this.handleClick = this.handleClick.bind(this);// this binding is necessary to make'this' work in this callback 
  }
  handleClick(){
    this.setState(prevState =>({
      isToggleOn: !prevState.isToggleOn //setState用来update state
      //es6写法，function (prevState){return ( isToggleOn = !prevState.isToggleOn);}
    }));
  }
  render(){
    return(
    <button onClick = {this.handleClick}> 
<!--         要有this,不然会是undefined -->
        {this.state.isToggleOn ? 'ON':'OFF'}
        </button>
    );
  }
}
ReactDOM.render(
<Toggle/>, document.body);

//example 3 (to avoid this) 但是推荐上面那种方法
class LoggingButton extends React.Component{
  handleClick(){
    console.log('this is', this);}
  render(){
    return(
      <button onClick = {(e) => this.handleClick(e)}>
        CLICK ME
        </button>
      );
  }
}
ReactDOM.render(<LoggingButton/>, document.body);
