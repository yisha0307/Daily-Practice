//搜索框组件
import React from 'react';
import ReactDOM from 'react-dom';

export default class Search extends React.Component{
	constructor(props){
		super(props);
		this.handleSearch = this.handleSearch.bind(this);
	}
	handleSearch(){
		let name = this.name.value;
		if(name === ''){
			return;
		}
		this.props.sendAction(name);
	}
	render(){
		return (
			<div>
				<input type='text' ref={(input) => {this.name = input;}} placeholder='enter the name you wanna search' />
				<button onClick = {this.handleSearch}>Search</button>
			</div>)
	}
}