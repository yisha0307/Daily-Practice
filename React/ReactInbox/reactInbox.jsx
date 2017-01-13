class App extends React.Component{
	constructor(props){
		super(props);
		const emails = this.props.emails;
		let id=0;
		for(const email of emails){
			email.id = id++;
		}
		this.state = {
			selectedEmailId: 0,
			currentSection:'inbox',
			emails //把emails从props变成states
		};
	}
	openEmail(id){
		const emails = this.state.emails;
		const index = emails.findIndex( x=> x.id===id);
		emails[index].read = 'true';
		this.setState({
			selectedEmailId: id,
			emails
		});
	}
	deleteEmail(id){
		const emails = this.state.emails;
		const index = emails.findIndex( x => x.id===id);
		emails[index].tag = 'deleted';
		let selectedEmailId ='';
		for(const email of emails){
			if(email.tag === this.state.currentSection){
				selectedEmailId = email.id;
				break; //delete email之后选的是后面那封邮件
			}
		}
		this.setState({
			selectedEmailId: selectedEmailId,
			emails
		});
	}
	setSidebarSection(section){
		//这个function是换section
		let {selectedEmailId} = this.state;
		if(section !== this.state.currentSection){
			selectedEmailId = '';
		}
		this.setState({
			currentSection: section,
			selectedEmailId
		});
	}
	render(){
		const currentEmail = this.state.emails.find(x => x.id === this.state.selectedEmailId); //找出现在选择的那个email
		return (
			<div>
				<Sidebar emails = {this.props.emails} setSidebarSection={(section) => this.setSidebarSection(section)} />
					<div className = 'inbox-container'>
						<EmailList emails={this.state.emails.filter(x => x.tag === this.state.currentSection)} onEmailSelected = {(id)=>this.openEmail(id)} selectedEmailId = {this.state.selectedEmailId} currentSection = {this.state.currentSection} />
						<EmailDetails email = {currentEmail} onDelete = {(id)=>this.deleteEmail(id)} />
					</div>
				</div>)
	}
}

const Sidebar = ({emails,setSidebarSection}) => {
	const unreadCount = emails.filter(x => x.tag ==='inbox' && x.read !=='true').length;
	const deletedCount = emails.filter(x => x.tag === 'deleted').length;
	return (
		<div id='sidebar'>
			<div className = 'sidebar_compose'>
				<a href='#' className='btn compose'>Compose
					<i className='fa fa-pencil-square-o'></i>
				</a>
			</div>
			<ul className = 'sidebar_inboxes'>
				<li onClick = {()=>setSidebarSection('inbox')}><a>Inbox<span>{unreadCount}</span></a></li>
				<li onClick = {()=>setSidebarSection('sent')}><a>Sent<span>0</span></a></li>
				<li onClick = {()=>setSidebarSection('drafts')}><a>Drafts<span>0</span></a></li>
				<li onClick = {()=>setSidebarSection('deleted')}><a>Trash<span>{deletedCount}</span></a></li>
			</ul>
		</div>
				);
}

const EmailList =({emails, onEmailSelected, currentSection, selectedEmailId}) =>{
	if(emails.length === 0){
		return <div className='email-list empty'> Nothing to see here, great job! </div>;
	}else{
		return (
			<div className='emails-list'>
			{emails.map((email) => {
				return (
					<EmailListItem onEmailClicked ={(id)=>onEmailSelected(id)} email = {email} selected = {selectedEmailId === email.id} />);
			})}
			</div>);
	};
}

const EmailListItem = ({onEmailClicked, email, selected}) => {
	let classes = 'email-item';
	if(selected){
		classes += ' selected';
	}
	return (
		<div onClick = {()=>onEmailClicked(email.id)} className={classes}>
			<div className = 'email-item__unread-dot' data-read = {email.read}></div>
			<div className = 'email-item__subject truncate'>{email.subject}</div>
			<div className = 'email-item__details'>
				<span className='email-item__form truncate'>{email.from}</span>
				<span className = 'email-item__time truncate'>{getPrettyDate(email.time)}</span>
			</div>
		</div>);
}

const EmailDetails = ({email, onDelete}) => {
	if(!email){
		return (
			<div className ='email-content empty'></div>);
	}
	const date = `${getPrettyDate(email.time)} ${getPrettyTime(email.time)}`;
	const getDeleteButton =()=>{
		if(email.tag !=='deleted'){
			return <span onClick ={()=> onDelete(email.id)}><i className = 'delete-btn fa fa-trash-o'></i></span>;
		}else{
			return false;
		}
	}
	return (
		<div className='email-content'>
			<div className = 'email-content__header'>
				<h3 className='email-content__subject'>{email.subject}</h3>
				{getDeleteButton()}
				<div className='email-content__time'>{date}</div>
				<div className ='email-content__from'>{email.from}</div>
			</div>
			<div className = 'email-content__message'>
			{email.message}</div>
		</div>
		);
};

//ajax 部分
$.ajax({
	url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/311743/dummy-emails.json',
	type:'GET',
	success: function(result){
		ReactDOM.render(<App emails = {result}/>, document.querySelector('#inbox'));
	},
	error: function(){
		console.log('Something went wrong...');
	}
});

const getPrettyDate = (date) =>{return date.split(' ')[0];}
const getPrettyTime = (date)=>{return date.split(' ')[1];}
