'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var data = [{
	jobTitle: 'UI/UX Designer',
	sort: 'Designer',
	brief: '6+ years’ experience designing desktop and mobile apps.Deep appreciation for simple solutions to complex problems.An amazing portfolio demonstrating successful delivery of innovative design solutions',
	date: 'June 4'
}, {
	jobTitle: 'Sales Manager',
	sort: 'Sales',
	brief: 'Determines annual unit and gross-profit plans by implementing marketing strategies; analyzing trends and results.Implements national sales programs by developing field sales action plans.Establishes and adjusts selling prices by monitoring costs, competition, and supply and demand.',
	date: 'April 21'
}, {
	jobTitle: 'Business Analyst',
	sort: 'Research',
	brief: 'Technical tasks (include coding, web pages, stored procedures, all database related work, technical design & specifications, loading data).Developing and documenting reports or data extracts starting from an end user request.Developing and documenting specifications for software, websites and e-commerce development or modifications.',
	date: 'March 15'
}];

var flag = true;

var App = React.createClass({
	displayName: 'App',
	render: function render() {
		return React.createElement(
			'div',
			{ id: 'job-opening' },
			React.createElement(
				'h2',
				null,
				'Job Openings'
			),
			React.createElement(Referral, { data: data })
		);
	}
});
var Referral = React.createClass({
	displayName: 'Referral',
	componentWillMount: function componentWillMount() {
		var openings = [];
		this.props.data.forEach(function (i) {
			openings.push({
				jobTitle: i.jobTitle,
				sort: i.sort,
				brief: i.brief,
				date: i.date,
				open: false,
				new: false,
				button: false
			});
		});
		var len = this.props.data.length;
		var buttonss = [];
		for (var i = 0; i < len; i++) {
			buttonss.push({ button: false });
		};
		openings[0].new = true;
		this.setState({
			openingItems: openings,
			buttonInfo: buttonss
		});
	},
	click: function click(i) {
		var newopenings = this.state.openingItems.slice();
		var index = newopenings.indexOf(i);
		newopenings[index].open = !newopenings[index].open;
		this.setState({ openingItems: newopenings });
	},
	mouseenter: function mouseenter(i) {
		var newopenings = this.state.openingItems.slice();
		var index = newopenings.indexOf(i);
		newopenings[index].button = true;
		this.setState({ openingItems: newopenings });
	},
	mouseleave: function mouseleave(i) {
		var newopenings = this.state.openingItems.slice();
		var index = newopenings.indexOf(i);
		newopenings[index].button = false;
		this.setState({ openingItems: newopenings });
	},
	render: function render() {
		var _this = this;

		var openn = this.state.openingItems;
		var buttoninfo = this.state.buttonInfo;
		var sections = openn.map(function (i) {
			return React.createElement(
				'div',
				{ className: 'opening', key: openn.indexOf(i) },
				React.createElement(
					'div',
					{ className: 'title', onClick: _this.click.bind(null, i), onMouseEnter: _this.mouseenter.bind(null, i), onMouseLeave: _this.mouseleave.bind(null, i) },
					React.createElement(
						'div',
						null,
						React.createElement(
							'div',
							{ className: 'job-title' },
							i.jobTitle
						),
						React.createElement(
							'span',
							{ className: i.new ? 'new' : '' },
							' ',
							i.new ? 'NEW' : '',
							' '
						)
					),
					React.createElement(
						'div',
						{ className: 'subtitle' },
						React.createElement(
							'div',
							{ className: 'job-sort' },
							i.sort
						),
						React.createElement(
							'div',
							{ className: 'opening-date' },
							i.date
						),
						React.createElement(
							'div',
							{ className: i.button ? 'content-show' : 'content-hide' },
							React.createElement(ButtonRefer, { info: i })
						)
					)
				),
				React.createElement(
					'div',
					{ className: i.open ? 'content-show' : 'content-hide' },
					React.createElement(Brief, { content: i.brief })
				)
			);
		});
		return React.createElement(
			'div',
			{ id: 'referral-form' },
			sections
		);
	}
});

var ButtonRefer = function (_React$Component) {
	_inherits(ButtonRefer, _React$Component);

	function ButtonRefer(props) {
		_classCallCheck(this, ButtonRefer);

		var _this2 = _possibleConstructorReturn(this, (ButtonRefer.__proto__ || Object.getPrototypeOf(ButtonRefer)).call(this, props));

		_this2.handleClick = _this2.handleClick.bind(_this2);
		return _this2;
	}

	_createClass(ButtonRefer, [{
		key: 'handleClick',
		value: function handleClick() {
			flag = false;
			renderPage(this.props.info);
			console.log(this.props.info);
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'button',
				{ className: 'referbtn', onClick: this.handleClick },
				'Refer'
			);
		}
	}]);

	return ButtonRefer;
}(React.Component);

//把brief的数据分行显示


var Brief = function (_React$Component2) {
	_inherits(Brief, _React$Component2);

	function Brief(props) {
		_classCallCheck(this, Brief);

		return _possibleConstructorReturn(this, (Brief.__proto__ || Object.getPrototypeOf(Brief)).call(this, props));
	}

	_createClass(Brief, [{
		key: 'render',
		value: function render() {
			var briefStr = this.props.content;
			var briefArr = briefStr.split('.', 3);
			var briefSection = briefArr.map(function (i) {
				return React.createElement(
					'li',
					{ key: briefArr.indexOf(i) },
					i
				);
			});
			return React.createElement(
				'ul',
				null,
				briefSection
			);
		}
	}]);

	return Brief;
}(React.Component);

var Form = function (_React$Component3) {
	_inherits(Form, _React$Component3);

	function Form(props) {
		_classCallCheck(this, Form);

		return _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));
	}

	_createClass(Form, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ id: 'form' },
				React.createElement(Return, null),
				React.createElement(EmployeeForm, { jobTitle: this.props.props.jobTitle, sort: this.props.props.sort })
			);
		}
	}]);

	return Form;
}(React.Component);

var Return = function (_React$Component4) {
	_inherits(Return, _React$Component4);

	function Return(props) {
		_classCallCheck(this, Return);

		var _this5 = _possibleConstructorReturn(this, (Return.__proto__ || Object.getPrototypeOf(Return)).call(this, props));

		_this5.handleClick = _this5.handleClick.bind(_this5);
		return _this5;
	}

	_createClass(Return, [{
		key: 'handleClick',
		value: function handleClick(e) {
			flag = true;
			renderPage();
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ className: 'returnitems', onClick: this.handleClick },
				React.createElement('i', { className: 'fa fa-angle-left', 'aria-hidden': 'true' }),
				React.createElement(
					'p',
					{ id: 'return' },
					'Return to listings'
				)
			);
		}
	}]);

	return Return;
}(React.Component);

var EmployeeForm = function (_React$Component5) {
	_inherits(EmployeeForm, _React$Component5);

	function EmployeeForm(props) {
		_classCallCheck(this, EmployeeForm);

		var _this6 = _possibleConstructorReturn(this, (EmployeeForm.__proto__ || Object.getPrototypeOf(EmployeeForm)).call(this, props));

		_this6.handleSubmit = _this6.handleSubmit.bind(_this6);
		_this6.state = { jobtitle: _this6.props.jobTitle, sortvalue: _this6.props.sort };
		_this6.handleReset = _this6.handleReset.bind(_this6);
		_this6.handleChange = _this6.handleChange.bind(_this6);
		_this6.handleChange1 = _this6.handleChange1.bind(_this6);
		return _this6;
	}

	_createClass(EmployeeForm, [{
		key: 'handleSubmit',
		value: function handleSubmit(e) {
			e.preventDefault();
		}
	}, {
		key: 'handleReset',
		value: function handleReset(e) {
			this.setState({
				jobtitle: '',
				sortvalue: e.target.value
			});
		}
	}, {
		key: 'handleChange',
		value: function handleChange(e) {
			this.setState({
				jobtitle: e.target.value
			});
		}
	}, {
		key: 'handleChange1',
		value: function handleChange1(e) {
			this.setState({
				sortvalue: e.target.value
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'form',
				{ id: 'form11', onSubmit: this.handleSubmit, onReset: this.handleReset },
				React.createElement(
					'h2',
					null,
					' Employee Referral'
				),
				React.createElement(
					'p',
					null,
					' For more information, please consult the ',
					React.createElement(
						'span',
						null,
						'employee handbook'
					),
					'.'
				),
				React.createElement(
					'div',
					{ id: 'form-parent' },
					React.createElement('input', { type: 'text', id: 'name', placeholder: 'Full Name' }),
					React.createElement('input', { type: 'text', id: 'email', placeholder: 'Email' }),
					React.createElement(
						'div',
						{ id: 'select' },
						React.createElement(
							'label',
							null,
							'Position',
							React.createElement('input', { type: 'text', id: 'jobjob', value: this.state.jobtitle, onChange: this.handleChange })
						),
						React.createElement(
							'select',
							{ value: this.state.sortvalue, onChange: this.handleChange1 },
							React.createElement(
								'option',
								null,
								'Design'
							),
							React.createElement(
								'option',
								null,
								'Sales'
							),
							React.createElement(
								'option',
								null,
								'Research'
							)
						)
					),
					React.createElement('input', { id: 'submit', type: 'submit', value: 'Submit' }),
					React.createElement('input', { id: 'reset', type: 'reset', value: 'Reset' })
				)
			);
		}
	}]);

	return EmployeeForm;
}(React.Component);

function renderPage(obj) {
	if (flag) {
		ReactDOM.render(React.createElement(App, null), document.querySelector('#app'));
	} else {
		ReactDOM.render(React.createElement(Form, { props: obj }), document.querySelector('#app'));
		console.log(obj);
	}
};

window.onload = renderPage();