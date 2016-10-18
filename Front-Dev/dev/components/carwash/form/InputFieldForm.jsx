import React from 'react';
import FormErrorInformation from './ErrorInformationForm.jsx';
import st from './../../../constants/style';
import msg from './../../../constants/message';

export default class FormInputField extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            value : this.props.defaultValue ? this.props.defaultValue  : '',
            errorDisplay : st.DISPLAY_NONE,
            errorMessage : msg.MESSAGE_DEFAULT_ERROR,
        }
        this.validation = this.validation.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleChange(e){
        let valid = this.validation(e.target.value);
        if (this.props.onChange){
            this.props.onChange(e, valid)
        }
    }

    validation(value){
        let errorDisplay = st.DISPLAY_NONE;
        let errorMessage = '';
        let valid = true;
        
        if (this.props.required && jQuery.isEmptyObject(value)){
            errorMessage = msg.MESSAGE_FIELD_IS_REQUIRED;
            errorDisplay = st.DISPLAY_BLOCK;
            valid = false;
        }else if (this.props.maxLength && value.trim().length > this.props.maxLength) {
            valid = false;
            errorMessage = this.props.maxLength + msg.MESSAGE_MAX_LENGTH;
            errorDisplay = st.DISPLAY_BLOCK;
        }else if (this.props.validation && !this.props.validation(value.trim())){
            valid = false;
            errorDisplay = st.DISPLAY_BLOCK;
            errorMessage = this.props.errorMessage;
        }
        
        this.setState({
            value : value,
            errorDisplay : errorDisplay,
            errorMessage : errorMessage
        })

        return valid;
    }

    handleBlur(e) {
        this.validation(e.target.value.trim());
    }

        render(){
        return(


            <div className="form-group">
                <label htmlFor = {this.props.name} className="col-sm-2 control-label">{this.props.title}</label>
                <div className="col-sm-10">

                    <input name={this.props.name}
                           type="text" className="form-control"
                           id={this.props.name}
                           placeholder={this.props.placeholder}
                           value={this.state.value}
                           onChange={this.handleChange}
                           onBlur={this.handleBlur}
                           disabled={this.props.disabled}
                    />

                    <FormErrorInformation
                        message = {this.state.errorMessage}
                        display = {this.state.errorDisplay}
                        uniqueName = "carWashNameError"
                    />
                </div>
            </div>
        )
    }
}