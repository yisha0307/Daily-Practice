'use strict';

const Heading = ({date,changeMonth,resetDate}) =>(
	<nav className = 'calendar--nav'>
		<a onClick = {()=> changeMonth(date.month()-1)}>&#8249;</a>
		<h1 onClick = {()=> resetDate()}>{date.format('MMMM')}
			<small>{date.format('YYYY')}</small>
		</h1>
		<a onClick = {()=>changeMonth(date.month()+1)}>&#8250;</a>
	</nav>);

const Day=({currentDate,date,startDate,endDate,onClick})=>{
	let className=[];
	if(moment().isSame(date,'day')){
		className.push('active'); //如果date和现在的日期一样,就用active
	}
	if(date.isSame(startDate,'day')){
		className.push('start');
	}
	if(date.isBetween(startDate, endDate,'day')){
		className.push('between');
	}
	if(date.isSame(endDate,'day')){
		className.push('end');
	}
	if(!date.isSame(currentDate,'month')){
		className.push('muted');
	}

	return(
		<span onClick={()=>onClick(date)} currentDate={date} className={className.join(' ')}>{date.date()}</span>);
};

const Days = ({date,startDate,endDate,onClick})=>{
	const thisDate = moment(date);
	const daysInMonth = moment(date).daysInMonth(); //get the num of days in the current month
	const firstDayDate = moment(date).startOf('month'); //get the first day of the month
	const previousMonth = moment(date).subtract(1,'month');//往前推一个月
	const previousMonthDays = previousMonth.daysInMonth();
	const nextMonth = moment(date).add(1,'month'); //往后推一个月
	let days = [];
	let labels = [];
	//开始排月份格式
	for(let i=1;i<=7;i++){
		labels.push(<span className='label'>{moment().day(i).format('ddd')}</span>);
	}
	for(let i = firstDayDate.day(); i>1; i--){
		previousMonth.date(previousMonthDays-i+2);
		days.push(<Day key={moment(previousMonth).format('DD MM YYYY')} onClick={(date)=>onClick(date)} currentDate={date} date={moment(previousMonth)} startDate = {startDate} endDate ={endDate} />);
	}
	for(let i=1; i<=daysInMonth;i++){
		thisDate.date(i);
		days.push(<Day key={moment(thisDate).format('DD MM YYYY')} onClick = {(date)=>onClick(date)} currentDate={date} date={moment(thisDate)} startDate = {startDate} endDate={endDate} />);
	}
	//把下个月灰色部分补齐
	const daysCount = days.length;
	for(let i = 1;i<=(42-daysCount);i++){
		nextMonth.date(i);
		days.push(<Day key={moment(nextMonth).format('DD MM YYYY')} onClick={(date)=>onClick(date)} date={moment(nextMonth)} startDate={startDate} endDate={endDate} />);
	}

	return (
		<nav className='calendar--days'>
		{labels.concat()}
		{days.concat()}
		</nav>);
};

class Calendar extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			//initial value
			date: moment(),//moment() = new Date(); now
			startDate: moment().subtract(5,'day'),//往前5天
			endDate : moment().add(3,'day')//往后三天
		};
	}
	resetDate(){
		this.setState({
			date:moment()
		});
	}
	//按前后箭头的时候会改变月份
	changeMonth(month){
		const {date} = this.state; //es6只会取date的值，不改变startDate和endDate
		date.month(month); //把date的月份改成新的
		this.setState(date);
	}
	
	changeDate(date){
		let{startDate,endDate} = this.state;
		if(startDate === null || date.isBefore(startDate,'day') || !startDate.isSame(endDate,'day')){
			startDate = moment(date);
			endDate = moment(date);
		}else if(date.isSame(startDate,'day')&&date.isSame(endDate,'day')){
			startDate = null;
			endDate = null;
		}else if(date.isAfter(startDate,'day')){
			endDate = moment(date);
		}

		this.setState({
			startDate,
			endDate});
	}
	render(){
		const {date,startDate,endDate} = this.state; //相当于date = this.state.date; startdate = this.state.startdate; enddate = this.state.enddate;
		return(
			//把changeMonth和changedate当做props传下去
			<div className = 'calendar'>
				<Heading date={date} changeMonth={(month) => this.changeMonth(month)} resetDate = {()=>this.resetDate()} /> 
				<Days onClick = {(date) => this.changeDate(date)} date={date} startDate = {startDate} endDate={endDate} />
			</div>)
	}
}

ReactDOM.render(<Calendar />,document.querySelector('#calendar'));