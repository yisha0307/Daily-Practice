var PRODUCTS =[
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

class ProductCategoryRow extends React.Component{
	render(){
		return (
			<tr><th colSpan = '2'>{this.props.category}</th></tr>);
	}
}

class ProductRow extends React.Component{
	render(){
		//如果没有stock了就变成红色
		var name = this.props.product.stocked ? this.props.product.name : 
		<span style={{color:'red'}}>{this.props.product.name}</span>;
		var product = this.props.product.stocked? this.props.product.price : 
		<span style = {{color:"red"}}>{this.props.product.price}</span>;
		return(
			<tr>
			<td>{name}</td>
			<td>{product}</td>
			</tr>)
	}
}

class ProductTable extends React.Component{
	render(){
		var rows =[];
		var lastCategory = null;
		this.props.products.forEach((product) => {
			if(product.name.indexOf(this.props.filterText)===-1 || (!product.stocked && this.props.inStockOnly)){
				return; //如果不是filtertext而且checkbox如果被勾选了但是stocked是false就不显示
			}
			if(product.category !== lastCategory){
				rows.push(<ProductCategoryRow category = {product.category} key = {product.category}/>);
			}
			rows.push(<ProductRow product={product} key = {product.name} />);
			lastCategory = product.category;
		});
		return(
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>);
	}
}

class SearchBar extends React.Component{
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(){
		this.props.onUserInput(
			this.filterTextInput.value,
			this.inStockOnlyInput.checked);//和onUserInput = this.handleUserInput对应起来
	}
	 render(){
	 	return(
	 		<form>
	 			<input type='text' placeholder = 'Search...' value = {this.props.filterText} ref={(input) => this.filterTextInput = input} onChange = {this.handleChange}/>
	 			<p>
	 				<input type='checkbox' checked = {this.props.inStockOnly} ref={(input) => this.inStockOnlyInput = input} onChange={this.handleChange}/>
	 				{' '}
	 				Only show products in stocked
 				</p>
			</form>
	 	);
	 }
}

class FilterableProuctTable extends React.Component{
	constructor(props){
		super(props);
		// to reflect the initial state of the application, and pass them as props
		this.state = {
			filterText: '', //这个例子里只有两个state,一个是用户输入的text，一个是checkbox
			inStockOnly : false
		};
		this.handleUserInput = this.handleUserInput.bind(this);
	}
	handleUserInput(filterText,inStockOnly){
		this.setState({
			filterText:filterText,
			inStockOnly:inStockOnly
		});
	}
	render(){
	// 为了把state传下去，把state变成了props
		return (
			<div>
				<SearchBar filterText = {this.state.filterText}
					inStockOnly = {this.state.inStockOnly}
					onUserInput={this.handleUserInput}/>
				<ProductTable products={this.props.products} 
					filterText = {this.state.filterText}
					inStockOnly = {this.state.inStockOnly}/>
			</div>);
	}
}

ReactDOM.render(
	<FilterableProuctTable products = {PRODUCTS} />,document.getElementById('container'));
 