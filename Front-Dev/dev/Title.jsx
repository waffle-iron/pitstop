import React from 'react';

export default class Title extends React.Component{
    render(){
        return (
            <div className="title-with-add-button">
                <h2 style = {titleStyle}>{this.props.title}:</h2>
            </div>
        )
    }
}
