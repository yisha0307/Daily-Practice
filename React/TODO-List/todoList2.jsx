class App extends React.Component{
	constructor(props){
		super(props);
		this.state={
			data:[],
			choice: 'all'
			// focus:false
		}
	}
	//按submit提交input，同时将该条信息push进data队列
	addClick(){
		const newContent = this.myTodo.value;
		//尽量避免用ref的string格式，写成callback		
		const data=this.props.data;
		data.push({content: newContent, status:'undo'});
		this.setState({
			data
			// focus:true
		});
		this.refs.myTodo.value ='';
	}
	//按每一条列表中的li从undo变成done,或者从done变成undo
	changeStatus(datum){
		if(datum.status === 'undo'){
			datum.status = 'done';
		}else if(datum.status === 'done'){
			datum.status = 'undo';
		}
		this.setState({
			datum
		});
	}
	//三个按钮各自的方法：显示所有的item, 显示done和undo的
	showlists(){
		let {data} = this.props;
		this.setState({
			data,
			choice: 'all'
		});
	}
	onDelete(){
		let {data} = this.props;
		data = data.filter((datum) => datum.status === 'undo');
		this.setState({
			data,
			choice:'undo'
		});
	}
	onCheck(){
		let {data} = this.props;
		data = data.filter((datum) => datum.status === 'done');
		this.setState({
			data,
			choice: 'done'
		});
	}
	// handleFocus(){
	// 	this.setState({focus:true});
	// }
	// handleBlur(){
	// 	this.setState({focus:false});
	// }

	render(){
		let {data,choice,focus} = this.state;
		return(
			<div>
				<h3>Todos</h3>
				<Display data={data} changeStatus = {(datum)=> this.changeStatus(datum)}/>
				<div className = 'inputs' >
					<input id='textInput' type='text' ref={input => this.myTodo = input}/>
					<button className='submitBtn_display' onClick = {()=>this.addClick()} ><i className="fa fa-plus" aria-hidden="true" /></button>
				</div>
				<BtnLists data = {data} choice={choice} showlists = {this.showlists.bind(this)} onDelete={this.onDelete.bind(this)} onCheck = {this.onCheck.bind(this)}/>
			</div>)
	}
}

const Display = ({data, changeStatus}) => {
	return (
		<ul className = 'display'>
		{data.map((datum,index) => (<DisplayItem datum={datum} index={index} changeStatus = {(datum)=>changeStatus(datum)}/>))}
			</ul>
			);
}

const DisplayItem = ({datum, index, changeStatus}) =>{
	return (
		<li key={index} className = {datum.status === 'undo'? 'undo-datum':'done-datum'} onClick = {()=>changeStatus(datum)}>{datum.content}
		<i className = {datum.status === 'undo'? '' : "fa fa-check" }/></li>)
}

const BtnLists =({data, choice, showlists, onDelete, onCheck}) => {
	return (
		<div className = 'btnclass'>
			<button id='lists' onClick = {()=> showlists()} className = {choice == 'all'? 'chosen' :' '}><i className="fa fa-list-ul"/></button>
			<button id='delete' onClick = {() => onDelete()} className = {choice == 'undo'? 'chosen' :' '}><i className="fa fa-times" /></button>
			<button id='checked' onClick ={() => onCheck()} className = {choice == 'undo'? 'chosen' :' '}><i className="fa fa-check"/></button>
		</div>);
}

ReactDOM.render(<App data={[]}/>, document.querySelector('#app'));
