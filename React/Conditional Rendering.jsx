//example 1
//小组件，根据用户isLoggedIn,看显示的是什么string
function UserGreeting(props){
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props){
  return <h1>Please sign up.</h1>
}

function Greeting(props){
  const isLoggedIn = props.isLoggedIn;
  if(isLoggedIn){
    return <UserGreeting/>;
  }else{
    return <GuestGreeting />;
  }
}

ReactDOM.render(<Greeting isLoggedIn={true} />, document.body);
