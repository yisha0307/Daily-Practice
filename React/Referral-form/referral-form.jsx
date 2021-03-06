var data = [{
	jobTitle:'UI/UX Designer',
	sort: 'Designer',
	brief:'6+ years’ experience designing desktop and mobile apps.Deep appreciation for simple solutions to complex problems.An amazing portfolio demonstrating successful delivery of innovative design solutions',
	date:'June 4'
},{
	jobTitle:'Sales Manager',
	sort:'Sales',
	brief:'Determines annual unit and gross-profit plans by implementing marketing strategies; analyzing trends and results.Implements national sales programs by developing field sales action plans.Establishes and adjusts selling prices by monitoring costs, competition, and supply and demand.',
	date:'April 21'
},{
	jobTitle:'Business Analyst',
	sort:'Research',
	brief:'Technical tasks (include coding, web pages, stored procedures, all database related work, technical design & specifications, loading data).Developing and documenting reports or data extracts starting from an end user request.Developing and documenting specifications for software, websites and e-commerce development or modifications.',
	date:'March 15'
}];

var flag = true;

const App = React.createClass({
	render(){
		return(
			<div id='job-opening'>
			<h2>Job Openings</h2>
			<Referral data={data}/>
			</div>);
	}
});
const Referral = React.createClass({
	 componentWillMount(){
		var openings = [];
		this.props.data.forEach((i)=>{
			openings.push({
				jobTitle: i.jobTitle,
				sort: i.sort,
				brief: i.brief,
				date: i.date,
				open: false,
				new: false,
				button:false
			});
		});
		const len = this.props.data.length;
		var buttonss = [];
		for (let i=0;i<len;i++){
			buttonss.push({button: false});
		};
		openings[0].new = true;
		this.setState({
			openingItems: openings,
			buttonInfo: buttonss
		});
		
	},
	click(i){
		const newopenings = this.state.openingItems.slice();
		const index = newopenings.indexOf(i);
		newopenings[index].open = !newopenings[index].open;
		this.setState({openingItems: newopenings});
	},
	mouseenter(i){
		const newopenings = this.state.openingItems.slice();
		const index = newopenings.indexOf(i);
		newopenings[index].button = true;
		this.setState({openingItems: newopenings});
	},
	mouseleave(i){
		const newopenings = this.state.openingItems.slice();
		const index = newopenings.indexOf(i);
		newopenings[index].button = false;
		this.setState({openingItems: newopenings}); 
	},
	render(){
		const openn = this.state.openingItems;
		const buttoninfo = this.state.buttonInfo;
		const sections = openn.map((i) => (
			<div className='opening' key={openn.indexOf(i)}>
				<div className='title' onClick ={this.click.bind(null,i)} onMouseEnter={this.mouseenter.bind(null,i)} onMouseLeave={this.mouseleave.bind(null,i)}>
				<div>
				<div className='job-title'>{i.jobTitle}</div>
				<span className = {i.new? 'new' :''} > {i.new? 'NEW' :''} </span>
				</div>
				<div className='subtitle'>
				<div className='job-sort'>{i.sort}</div>
				<div className='opening-date'>{i.date}</div>
				<div className={i.button?'content-show':'content-hide'}><ButtonRefer info={i}/></div>
				</div>
				</div>
				<div className ={i.open?'content-show':'content-hide'}><Brief content={i.brief}/></div>
				</div>));
		return (<div id='referral-form'>{sections}</div>);
	}
})

class ButtonRefer extends React.Component{
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(){ 
		flag = false;
		renderPage(this.props.info);
		console.log(this.props.info);
	}
	render(){
		return(
			<button className='referbtn' onClick={this.handleClick}>Refer</button>);
	}
}

//把brief的数据分行显示
class Brief extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		const briefStr = this.props.content;
		const briefArr = briefStr.split('.',3);
		const briefSection = briefArr.map((i) =>(
			<li key={briefArr.indexOf(i)}>{i}</li>));
		return(
		<ul>{briefSection}</ul>);
	}
}

class Form extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div id='form'>
			<Return />
			<EmployeeForm jobTitle={this.props.props.jobTitle} sort={this.props.props.sort}/>
			</div>);
	}
}

class Return extends React.Component{
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(e){
		flag = true;
		renderPage();
	}
	render(){
		return(
			<div className='returnitems' onClick = {this.handleClick}>
			<i className="fa fa-angle-left" aria-hidden="true"></i>
			<p id='return'>Return to listings</p>
			</div>);
	}
}

class EmployeeForm extends React.Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state={jobtitle:this.props.jobTitle, sortvalue:this.props.sort}
		this.handleReset = this.handleReset.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleChange1 = this.handleChange1.bind(this);
	}
	handleSubmit(e){
		e.preventDefault();
	}
	handleReset(e){
		this.setState({
			jobtitle:'',
			sortvalue:e.target.value
		})
	}
	handleChange(e){
		this.setState({
			jobtitle:e.target.value
		})
	}
	handleChange1(e){
		this.setState({
			sortvalue:e.target.value
		})
	}
	render(){
		return(
			<form id='form11' onSubmit = {this.handleSubmit} onReset={this.handleReset}>
			<h2> Employee Referral</h2>
			<p> For more information, please consult the <span>employee handbook</span>.</p>
			<div id='form-parent'>
			<input type='text' id='name' placeholder= 'Full Name'/>
			<input type='text' id='email' placeholder='Email'/>
			<div id='select'>
			<label>Position
			<input type='text' id='jobjob' value={this.state.jobtitle} onChange={this.handleChange}/>
			</label>
			<select value={this.state.sortvalue} onChange={this.handleChange1}>
			<option>Design</option>
			<option>Sales</option>
			<option>Research</option>
			</select>
			</div>
			<input id='submit' type='submit' value='Submit' />
			<input id='reset' type='reset' value='Reset' />
			</div>
			</form>);
	}
}

function renderPage(obj){
	if(flag){
	ReactDOM.render(<App />, document.querySelector('#app'));}else{
		ReactDOM.render(<Form props={obj}/>,document.querySelector('#app'));
		console.log(obj);
	}};

window.onload = renderPage();