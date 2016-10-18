import React from 'react';

export default class SelectFieldForm extends React.Component{

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }

    static propTypes = {
        list : React.PropTypes.array.isRequired,
        name : React.PropTypes.string.isRequired,
        title : React.PropTypes.string.isRequired,
        onChange : React.PropTypes.func.isRequired
    }

    handleChange(e){
            this.props.onChange(e)
    }

    render(){
        let option = [];
        for (let i = 0; i<this.props.list.length; i++){
            option.push(
                <option key={i} value={this.props.list[i]}>{this.props.list[i]}</option>
            )
        }

        return(
            <div className="form-group">
                <label htmlFor={this.props.name} className="col-sm-2 control-label">{this.props.title}</label>
                <div className="col-sm-10">
                    <select className="form-control"
                            name={this.props.name}
                            id={this.props.name}
                            value={this.props.select}
                            onChange={this.handleChange}>
                        {option}</select>
                </div>
            </div>
        )
    }
}
