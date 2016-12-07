function Welcome(p){
  return <h1>Hello, {p.name}</h1>;
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

