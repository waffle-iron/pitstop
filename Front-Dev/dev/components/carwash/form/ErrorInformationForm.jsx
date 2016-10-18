import React from 'react';

export default class FormErrorInformation extends React.Component{

    render(){
        let errorStyle = {
            color: '#a94442',
            backgroundColor: '#f2dede',
            borderColor: '#ebccd1',
            display: this.props.display === undefined ? 'none' : this.props.display,
            padding: '5px',
            borderRadius: '4px',
            marginTop: '3px'
        }

        return(
            <div style={errorStyle} id={this.props.uniqueName === undefined ? Math.random() : this.props.uniqueName}>
                <strong>Ошибка!</strong> {this.props.message}
            </div>
        )
    }

}
