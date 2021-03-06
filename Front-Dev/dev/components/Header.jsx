import React from 'react';
import { Router, Route, Link, IndexRoute, IndexLink, hashHistory } from 'react-router'
import MessageConteiner from './../containers/MessageContainer'

export default class MyHeader extends React.Component{

	constructor(props) {
		super(props);
	};

	render() {
	    return (
		<div className = "page">
	      <header>
			  <nav className="navbar navbar-default">
				  <div className="container-fluid">
					  <div className="navbar-header">
						  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
							  <span className="sr-only">Toggle navigation</span>
							  <span className="icon-bar"></span>
							  <span className="icon-bar"></span>
							  <span className="icon-bar"></span>
						  </button>
						  <div className="navbar-brand" >{this.props.userName}</div>
					  </div>

					  <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						  <ul className="nav navbar-nav">
							  <li className="active" onClick={()=>this.props.resetInfoAndError()}><Link to="/owner.html">Главная<span className="sr-only">(current)</span></Link></li>
							  <li onClick={()=>this.props.resetInfoAndError()}><Link to="/carwash">Мойки</Link></li>
						  </ul>

						  <ul className="nav navbar-nav navbar-right">
							  <li><a href="#">Link</a></li>
							  <li className="dropdown">
								  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
								  <ul className="dropdown-menu">
									  <li><a href="#">Action</a></li>
									  <li><a href="#">Another action</a></li>
									  <li><a href="#">Something else here</a></li>
									  <li role="separator" className="divider"></li>
									  <li><a href="#">Separated link</a></li>
								  </ul>
							  </li>
						  </ul>
					  </div>
				  </div>
			  </nav>
		  </header>
		  <MessageConteiner/>
		  <div className="content">
			{React.cloneElement(
				this.props.children,
				{resetInfoAndError: this.props.resetInfoAndError,
				 saveInfo: this.props.saveInfo
				}
			)}
		  </div>
		</div>
	    );
  }
};

