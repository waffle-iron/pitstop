import React from "react";
import ReactDOM from "react-dom";

var Header = React.createClass({
  render: function() {
    return (
      <header>
        <nav>
          <a href="#">Имя</a>
          <a href="#">Главная</a>
          <a href="#">Мойки</a>
          
        </nav>
      </header>
    );
  }
});
 
var HelloWorld = React.createClass({
  render: function() {
    return (
      <p>Hello, {this.props.greetTarget}!</p>
    );
  }
});

 
ReactDOM.render(
  <div>
    <Header/>
    <HelloWorld greetTarget="Batman"/>
    <HelloWorld greetTarget="Iron Man"/>
    <HelloWorld greetTarget="Nicolas Cage"/>
    <HelloWorld greetTarget="Mega Man"/>
    <HelloWorld greetTarget="Bono"/>
    <HelloWorld greetTarget="Catwoman"/>
  </div>,
  document.querySelector("#container")
);  