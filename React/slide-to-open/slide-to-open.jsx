class App extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			isBlank:false,
		}
	}
	handleChild(){
		this.setState({
			isBlank: true
		});
	}
	render(){
		const isBlank = this.state.isBlank;
		if(isBlank){
			return (
				<div className = 'slide__blank'></div>);
		}else{
			return (
				<div>
					<SlideText />
					<SlideButton left={window.innerWidth*0.32} handleChild={this.handleChild.bind(this)} />
				</div>);
		}
	}
}

class SlideText extends React.Component{
	render(){
		return (
			<div className = 'slide__text'>
				<h1>slide to open</h1>
				<p>Created by <b>E-sha</b></p>
			</div>);
	}
}

class SlideButton extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			left: this.props.left,
			isDragging: false, //设置是不是在drag状态下
			relativex:null,
		};
	}
	handleMouseDown(e){
		this.setState({
			isDragging: true,
			relativex: e.pageX - this.props.left
		});
	}
	handleMouseMove(e){
		if(this.state.isDragging){
			const maxX = window.innerWidth *0.57;
			let moveX = e.pageX - this.state.relativex;

			moveX = Math.min(Math.max(this.props.left, moveX), maxX);
			this.setState({left: moveX});
		}else{
			return false;
		}
		console.log((window.innerWidth*0.6 - this.state.left) / 30);
	}
	handleMouseUp(e){
		const maxX = window.innerWidth *0.57;
		if(this.state.left === maxX){
			this.setState({
				isDragging: false,
				relativex: null,
			});
			this.props.handleChild();
		}else{
			this.setState({
				isDragging: false,
				relativex: null,
				left: this.props.left
			});
		}
	}
	render(){
		const left = this.state.left;
		let dotCount = Math.floor((window.innerWidth*0.6 - left) / 12);
		return (
			<div className ='slide__button' style={{'left': left}} onMouseUp={this.handleMouseUp.bind(this)} onMouseMove={this.handleMouseMove.bind(this)} onMouseDown={this.handleMouseDown.bind(this)}>
				<div id='bigcircle'><div id='innercircle'>{'>'}</div></div>
				<DotLine count ={dotCount} />
				<div id='smallcircle'>{'.'}</div>
			</div>);
	}
}

const DotLine = ({count}) =>{
	const dotline  = [];
	for(let i =0; i< count-8; i++){
		dotline.push(<div className='dotdot' key={i}/>);
	}
	return (
		<div className='dotline'>
			{dotline.concat()}
		</div>);

}

ReactDOM.render(<App />, document.querySelector('#app'));