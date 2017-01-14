class App extends React.Component{
	constructor(props){
		super(props);
		const emails = this.props.emails;
		let id=0;
		for(const email of emails){
			email.id = id++;
		};
		this.state={
			emails,
			selectedEmail: 0,
			currentSection:'inbox'
		};
	}
	openEmail(id){
		const emails = this.state.emails;
		const index = emails.findIndex(x => x.id === id);
		emails[index].read = 'true';
		this.setState({
			selectedEmail: id,
			emails
		})
	}
	deleteEmail(id){
		const emails = this.state.emails;
		const index = emails.findIndex(x=>x.id === id);
		emails[index].tag='deleted';
		selectedEmail = emails.find( x=> x.tag===emails[id].tag && x.id > id);
		this.setState({
			selectedEmail: selectedEmail,
			emails
		})
	}
	setSidebarSection(section){
		let {selectedEmail} = this.state;
		if(section !== this.state.currentSection){
			selectedEmail = '';
		}
		this.setState({
			currentSection: section,
			selectedEmail
		})
	}
	render(){
		let {selectedEmail,currentSection} = this.state;
		return(
			<div>
			<Sidebar emails={this.props.emails} currentSection={currentSection} selectedEmail={selectedEmail} setSidebarSection={(section)=>this.setSidebarSection(section)} />
			<EmailList emails = {this.state.emails.filter(x=>x.tag === currentSection)} currentSection={currentSection} selectedEmail={selectedEmail} openEmail = {(id)=>this.openEmail(id)} />
			<EmailDetail email={this.props.emails[selectedEmail]} deleteEmail={(id)=>this.deleteEmail(id)} />
			</div>
			);
	}
}

const Sidebar = ({emails, currentSection, selectedEmail, setSidebarSection}) => {
	const unreadCount = emails.filter(x=>x.tag === 'inbox' && x.read==='false').length;
	const deletedCount = emails.filter(x => x.tag === 'deleted').length;
	return (
		<div className = 'sidebar'>
			<div className='sidebar_compose'>Compose
			<i className='fa fa-pencil-square-o'></i>
			</div>
			<ul className ='sidebar_sections'>
				<li key='inbox' onClick = {()=>setSidebarSection('inbox')}>Inbox
					<span>{unreadCount}</span></li>
				<li key='sent' onClick = {()=>setSidebarSection('sent')}>Sent
					<span>0</span></li>
				<li key='drafts' onClick={()=>setSidebarSection('drafts')}>Drafts 
					<span>0</span></li>
				<li key='trash' onClick={()=>setSidebarSection('deleted')}>Trash
					<span>{deletedCount}</span></li>
			</ul>
		</div>
			);
}

const EmailList = ({emails,currentSection,selectedEmail,openEmail}) => {
	if(emails.length === 0){
		return <div className='emaillist empty'>Nothing to see here, great job!</div>;
	}
	return (
		<div className='emaillist list'>
		{emails.map((email,index)=><EmailItem key={index} openEmail={(id)=>openEmail(id)} email={email} selectedEmail={email.id === selectedEmail} />)}
		</div>
		);
}

const EmailItem = ({openEmail,email,selectedEmail}) =>{
	let classes='email_item';
	if(selectedEmail){
		classes += ' selected_item';
	}
	return(
		<div className={classes} onClick={()=>openEmail(email.id)}>
		<h4>{email.subject}</h4>
		<span className={email.read==='true'?'':'unread'}></span>
		<p>{email.from}
		<span>{getPrettyDate(email.time)}</span></p>
		</div>);
}

const EmailDetail = ({email,deleteEmail}) =>{
	if(!email){
		return (
			<div className='emailDetail empty'></div>)
	}else{
		return(
			<div className = 'emailDetail detail'>
				<div className='emailDetail__header'>
				<h4>{email.subject}</h4>
				<i className='fa fa-trash' onClick={()=>deleteEmail(email.id)}></i>
				<p>{email.from}</p>
				<span>{getPrettyDate(email.time)}{'  '}
				{getprettyTime(email.time)}</span>
				</div>
				<div className='emailDetail__content'>
				<p>{email.message}</p>
				</div>
			</div>);
	}
}

//render
$.ajax({
	url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/311743/dummy-emails.json',
	type: 'GET',
	success: function(result){
		ReactDOM.render(<App emails={result} />,document.querySelector('#inbox'));
	},
	error: function(){
		alert('Something went wrong...');
	}

})

const getPrettyDate = (time)=>{return (time.split(' ')[0])};
const getprettyTime = (time) =>{return (time.split(' ')[1])};