function Boiling(props){
  if(props.celsius >=100){
    return <p>Water will boil.</p>;
  }else{
    return <p>Water would not boil.</p>;
  }
}

function toCelsius(fahrenheit){
  return (fahrenheit -32)*5/9;
}
function toFahrenheit(celsius){
  return (celsius * 9/5)+32;
}

function tryConvert(value,convert){
  const input = parseFloat(value);
  if(Number.isNaN(input)){
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000)/1000;
  return rounded.toString();
}

const scaleNames={
  c:'celsius',
  f:'fahrenheit'
};

class TempratureInput extends React.Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e){
    this.props.onChange(e.target.value);
  }
  render(){
    const value = this.props.value;
    const scale = this.props.scale;
    return (
      <fieldset><legend>Enter temprature in {scaleNames[scale]}: </legend>
      <input value={value} onChange={this.handleChange} />
      </fieldset>);
  }
}

class Calculator extends React.Component{
  constructor(props){
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state={value:'', scale:'c'};
  }
  handleFahrenheitChange(value){
    this.setState({scale:'f',value});
  }
  handleCelsiusChange(value){
    this.setState({scale:'c',value});
  }
  render(){
    const scale = this.state.scale;
    const value = this.state.value;
    const celsius = scale ==='f'? tryConvert(value,toCelsius) : value;
    const fahrenheit = scale ==='c'? tryConvert(value,toFahrenheit):value;
    return (
     <div>
     <TempratureInput scale='c' value={celsius} onChange = {this.handleCelsiusChange}/>
     <TempratureInput scale='f' value={fahrenheit} onChange ={this.handleFahrenheitChange}/>
     <Boiling celsius = {parseFloat(celsius)}/>
     </div>);
  }
}

ReactDOM.render(<Calculator />,document.body);