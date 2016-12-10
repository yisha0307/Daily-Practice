<script src="https://fb.me/react-15.0.0.js"></script>
<script src="https://fb.me/react-dom-15.0.0.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
<script type="text/babel">

<!--// example 1	 -->
	function Blog(props){
		const sidebar = (
			<ul>
				{props.posts.map((post) =>
					<li key={post.id}>{post.title}</li>)}
			</ul>
			);
		const content = props.posts.map((post) =>
				<div key={post.id}>	
<!-- jsx的列表要用keys，不同的列表可以用一样的key，但是list内和他的siblings得不一样-->
				<h3>{post.title}</h3>
				<p>{post.content}</p>
				</div>
				);
		return (
			<div>
			{sidebar}
			<hr/>
			{content}
			</div>)
	}

	const posts = [
	 {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
	  {id: 2, title: 'Installation', content: 'You can install React from npm.'}];

	ReactDOM.render(
		<Blog posts={posts} />, document.body);

<!-- example 2 表单提交：jsx里要用event.preventDefault(),不能用return false	 -->
	class NameForm extends React.Component{
		constructor(props){
			super(props);
			this.state = ({value: ''});
			this.handleChange= this.handleChange.bind(this);
			this.handleSubmit = this.handleSubmit.bind(this);
		}
		handleChange(event){
			this.setState({value:event.target.value.toUpperCase()});
			//enforce that names are written with all uppercase letters with every keystoke
		}
		handleSubmit(event){
			alert('name '+ this.state.value +' has been submitted.');
			event.preventDefault();
		}
		render(){
			return(
			<form onSubmit = {this.handleSubmit}> 
			<label>
			name:
			<input type="text" value = {this.state.value} onChange = {this.handleChange} />
			</label>
			<input type='submit' value="submit"/>
			</form>);
		}
	}

	ReactDOM.render(<NameForm />,document.body);
	
<!-- 	example 3: 用textarea，与html dom不一样的是，jsx里textarea是<textarea/>,和<input/>处理一样 -->
	class EssayForm extends React.Component{
		constructor(props){
			super(props);
			this.state =({
				value:'please write an essay about your favorite DOM element.'
			});
			this.handleChange = this.handleChange.bind(this);
			this.handleSubmit = this.handleSubmit.bind(this);
		};
		handleChange(event){
			this.setState({value:event.target.value});
		}
		handleSubmit(event){
			alert('An essay was submitted: '+this.state.value);
			event.preventDefault();
		}
		render(){
			return(
				<form onSubmit = {this.handleSubmit}>
				<label>
				Name:
				<textarea value = {this.state.value} onChange = {this.handleChange} />
				</label>
				<input type="submit"/>
				</form> );
		}
	}
	ReactDOM.render(<EssayForm/>, document.body);
	
<!-- 	example 4 select表单 -->
	class FlavorForm extends React.Component {
	  constructor(props) {
	    super(props);
	    this.state = {value: 'coconut'};//default的这个选项在state里定义，而不是用selected  
	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	  }

	  handleChange(event) {
	    this.setState({value: event.target.value});
	  }

	  handleSubmit(event) {
	    alert('Your favorite flavor is: ' + this.state.value);
	    event.preventDefault();
	  }

	  render() {
	    return (
	      <form onSubmit={this.handleSubmit}>
		<label>
		  Pick your favorite La Croix flavor:
		  <select value={this.state.value} onChange={this.handleChange}>
		    <option value="grapefruit">Grapefruit</option>
		    <option value="lime">Lime</option>
		    <option value="coconut">Coconut</option>
		    <option value="mango">Mango</option>
		  </select>
		</label>
		<input type="submit" value="Submit" />
	      </form>
	    );
	  }
	}
	
<!-- 	example 5 一个小组件，如果输入的温度超过100，显示水会沸腾；否则不会； -->
	function Boiling(props){
		if(props.celsius >= 100){
			return <p>The water would boil.</p>;
		}
		return <p> The water would not boil.</p>;
	}

	class Calculator extends React.Component{
		constructor(props){
		super(props);
		this.state ={value:''};
		this.handleChange = this.handleChange.bind(this);
		}
		handleChange(e){
			this.setState({value:e.target.value});
		}

		render(){
			const value = this.state.value;
			return(
				<fieldset>
					<legend>Enter temperature in Celsuis:</legend>
					<input
						value={value}
						onChange = {this.handleChange} />
					<Boiling celsius={parseFloat(value)} />
					</fieldset>
				);
		}
	}

	ReactDOM.render(<Calculator/>,document.body);
	
<!-- 	example6 做一个celsius和fahrenheit转换的小UI -->
	function Boiling(props){
		if(props.celsius >= 100){
		return <p>The water would boil.</p>;
		}
		return <p> The water would not boil.</p>;
	}


	const scaleNames = {
		c:'Celsius',
		f:'Fahrenheit'
	};
	
	function toCelsius(fahrenheit){
		return (fahrenheit-32)*5/9;
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
		const rounded = Math.round(output*1000)/1000;
		return rounded.toString();
	}

	class TemperatureInput extends React.Component{
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
			return(
				<fieldset>
				<legend>Enter temperature in {scaleNames[scale]}:</legend>
				<input value={value} onChange = {this.handleChange} />
				</fieldset>
				);
		}
	}

	class Calculator extends React.Component {
		constructor(props){
			super(props);
			this.handleCelsuisChange = this.handleCelsuisChange.bind(this);
			this.handleFaChange = this.handleFaChange.bind(this);
			this.state = {value:'', scale:'c'};
		}

		handleCelsuisChange(value){
			this.setState({scale:'c', value});
		}
		handleFaChange(value){
			this.setState({scale:'f',value});
		}

	  render() {
	  	const value = this.state.value;
	  	const scale = this.state.scale;
	  	const fahrenheit = scale === 'c'? tryConvert(value,toFahrenheit) : value;
	  	const celsius = scale ==='f'? tryConvert(value,toCelsius):value;
		return (
	      <div>
	        <TemperatureInput scale="c" value={celsius} onChange={this.handleCelsuisChange} />
	        <TemperatureInput scale="f" value={fahrenheit} onChange={this.handleFaChange} />
	        <Boiling
	          celsius={parseFloat(celsius)} />
	      </div>
	    );
	  }
	}

	ReactDOM.render(<Calculator />,document.body);
</script>
