class Title extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		let {infos,handleClick,flag} = this.props;
		return(
			<div className='Tab-title'>
			{infos.map((info,index)=>{
				return <div key={index} onClick ={()=>handleClick(index)} className={'title-div '+(index === flag? 'title-selected':'')}>{info.title}</div>;
			})}
			</div>);
	}
}

class Contents extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		let {infos, flag} = this.props;
		return(
			<div className='Tab-contents'>
			{infos.map((info,index)=>{
				return <div key={index} className={'content '+(index === flag? 'content-visible':'')}>{info.content}</div>;
			})}
			</div>);
	}
}

class Tabs extends React.Component{
	constructor(props){
		super(props);
		this.state={flag:0};
	}
	handleClick(fig){
		this.setState({flag:fig});
	}
	render(){
		const INFO = [
		{title:'Popular', content: <p>Isi konten widget tab 1<br/><br/>Bisa sobat isi dengan widget apa saja, misal widget popular post, label, arsip, dll.<br/><br/>Donec at dolor mi. Pellentesque sit amet ornare risus. Fusce varius ut turpis sed semper. In ut est et enim gravida interdum nec id quam.<br/><br/> Aliquam leo ante, posuere id suscipit et, varius quis metus.<br/><br/>Aenean tincidunt pellentesque facilisis. Aliquam leo ante, posuere id suscipit et, varius quis metus.</p>},
		{title:'Tags', content: <p>Isi konten widget tab 2<br/><br/>Bisa sobat isi dengan widget apa saja, misal widget popular post, label, arsip, dll.<br/><br/>Donec at dolor mi. Pellentesque sit amet ornare risus. Fusce varius ut turpis sed semper. In ut est et enim gravida interdum nec id quam.<br/><br/> Aliquam leo ante, posuere id suscipit et, varius quis metus.<br/><br/>Aenean tincidunt pellentesque facilisis. Aliquam leo ante, posuere id suscipit et, varius quis metus.</p>},
		{title:'Archive', content: <p>Isi konten widget tab 3<br/><br/>Bisa sobat isi dengan widget apa saja, misal widget popular post, label, arsip, dll.<br/><br/>Donec at dolor mi. Pellentesque sit amet ornare risus. Fusce varius ut turpis sed semper. In ut est et enim gravida interdum nec id quam.<br/><br/> Aliquam leo ante, posuere id suscipit et, varius quis metus.<br/><br/>Aenean tincidunt pellentesque facilisis. Aliquam leo ante, posuere id suscipit et, varius quis metus.</p>},
		];
		return (
			<div>
			<Title infos ={INFO} handleClick={this.handleClick.bind(this)} flag={this.state.flag}/>
			<Contents infos ={INFO} flag={this.state.flag} />
			</div>
			)
	}
}

ReactDOM.render(<Tabs />,document.querySelector('#tabs'));