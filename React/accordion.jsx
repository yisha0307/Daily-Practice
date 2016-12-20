var data=[
    	{
        title: "One", 
        content: `Lorem ipsum dolor sit amet, 
                  consectetur adipiscing elit, 
                  sed do eiusmod tempor incididunt 
                  ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis 
                  nostrud exercitation ullamco laboris 
                  nisi ut aliquip ex ea commodo consequat. 
                  Duis aute irure dolor in reprehenderit 
                  in voluptate velit esse cillum dolore 
                  eu fugiat nulla pariatur. Excepteur 
                  sint occaecat cupidatat non proident, 
                  sunt in culpa qui officia deserunt 
                  mollit anim id est laborum.`
      }, {
        title: "Two", 
        content: `Lorem ipsum dolor sit amet, 
                  consectetur adipiscing elit, 
                  sed do eiusmod tempor incididunt 
                  ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis 
                  nostrud exercitation ullamco laboris 
                  nisi ut aliquip ex ea commodo consequat. 
                  Duis aute irure dolor in reprehenderit 
                  in voluptate velit esse cillum dolore 
                  eu fugiat nulla pariatur. Excepteur 
                  sint occaecat cupidatat non proident, 
                  sunt in culpa qui officia deserunt 
                  mollit anim id est laborum.`
      },{
        title: "Three", 
        content: `Lorem ipsum dolor sit amet, 
                  consectetur adipiscing elit, 
                  sed do eiusmod tempor incididunt 
                  ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis 
                  nostrud exercitation ullamco laboris 
                  nisi ut aliquip ex ea commodo consequat. 
                  Duis aute irure dolor in reprehenderit 
                  in voluptate velit esse cillum dolore 
                  eu fugiat nulla pariatur. Excepteur 
                  sint occaecat cupidatat non proident, 
                  sunt in culpa qui officia deserunt 
                  mollit anim id est laborum.`
      }
    ];

class App extends React.Component{
	render(){
		return (
			<Accordion data={data}/>);
	}
}

const Accordion = React.createClass({
  componentWillMount(){
    let accordion = [];
    this.props.data.forEach((i)=>{ //相当于把原来的data再组装一下，每个后面加上一个状态open:false
      accordion.push({
        title: i.title,
        content:i.content,
        open:false
      });
    });
    this.setState({
      accordionItems: accordion
    });
  },
  click(i){
    const newAccordion = this.state.accordionItems.slice();
    const index = newAccordion.indexOf(i);

    newAccordion[index].open = !newAccordion[index].open;
    this.setState({accordionItems: newAccordion});
  },
  render(){
    const sections = this.state.accordionItems.map((i)=>(
      <div key = {this.state.accordionItems.indexOf(i)}><div className='title' onClick = {this.click.bind(null,i)}>
      <div className='title-text'>{i.title}</div>
      <i className = {i.open? "fa fa-angle-down fa-rotate-180" : "fa fa-angle-down"}></i>
      </div>
      <div className = 'content-text' className={i.open? 'content content-show':'content'}>{i.content}</div>
      </div>));
    return (<div className='accordion'>{sections}</div>);
  }
})

ReactDOM.render(<App />, document.querySelector('#root'));