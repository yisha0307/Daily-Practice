const TABS=[
        {title: "Download CV", content: <a href="#">Click here to download!</a>},
        {title: <i className="fa fa-envelope"></i>, content:<span><a href="mailto:tv.weinstock@gmail.com"> tv.weinstock@gmail.com</a></span>},        
        {title: <i className="fa fa-share-alt"></i>, content: <ul> <li><i className="fa fa-github"></i></li> <li><i className="fa fa-codepen"></i></li> <li><i className="fa fa-linkedin"></i></li> <li><i className="fa fa-twitter"></i></li> </ul>}
      ];

const TabsSwitcher = ({tabs,handleClick,display})=>{
	const items = tabs.map((item,index)=><li key={index} onClick ={()=>handleClick(index)} className={'tabs '+(index===display?'tabs-selected':'')}>{item.title}</li>);
	return(
		<div className='switcher'>
		{items}
		</div>);
}

const TabsContent =({tabs,display})=>{
	const contents = tabs.map((tab,index)=><div key={index} className={'tabsC '+(index === display?'tabsC-selected':' ')}>{tab.content}</div>);
	return(
		<div className='tabcontent'>
		{contents}
		</div>);
}


class ReactTabs extends React.Component{
	constructor(props){
		super(props);
		this.state = {display:1};
	}
	handleClick(value){
		this.setState({display:value});
	}
	render(){
		return(
			<div>
			<TabsSwitcher tabs = {this.props.tabs} display={this.state.display} handleClick={(value)=>this.handleClick(value)}/>
			<TabsContent tabs={this.props.tabs} display={this.state.display}/>
			</div>);
	}
}

ReactDOM.render(<ReactTabs tabs={TABS}/>,document.querySelector('#tabs-wrapper'));
