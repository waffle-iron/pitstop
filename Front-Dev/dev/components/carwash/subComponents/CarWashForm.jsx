import React from 'react';
import FormInputField from '../form/InputFieldForm.jsx';
import SelectFiledForm from '../form/SelectFieldForm.jsx';
import ErrorInformation from '../form/ErrorInformationForm.jsx';
import {Router} from 'react-router'
import message from './../../../constants/message';
import style from './../../../constants/style';
import settings from './../../../constants/settings';
import urls from './../../../constants/urls';
import {browserHistory} from 'react-router';
import Loading from '../form/loading.jsx';

export default class CarWashForm extends React.Component{

    static propType = {
        saveInfo: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            name        :  {value : message.EMPTY_FIELD, isValid : false},
            address     :  {value : message.EMPTY_FIELD, isValid : true},
            phoneNumber :  {value : message.EMPTY_FIELD, isValid : true},
            boxCount    :  {value : 1, isValid : true},
            firstShift  :  {value : settings.FIRST_SHIFT_DEFAULT_TIME, isValid : true},
            secondShift :  {value : settings.SECOND_SHIFT_DEFAULT_TIME, isValid : true},
            errorDisplay : style.DISPLAY_NONE,
            errorMessage : message.MESSAGE_DEFAULT_ERROR,
            isCarWashDownload : false,
            initialName : undefined,
            carWashId : undefined
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
        this.handleBoxCountChange = this.handleBoxCountChange.bind(this);
        this.handleFirstShiftChange = this.handleFirstShiftChange.bind(this);
        this.handleSecondShiftChange = this.handleSecondShiftChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validationName = this.validationName.bind(this)
    }

    componentDidMount(){
        if (this.props.edit && !this.state.isCarWashDownload){
            let link = "/carwash/"+this.props.id;
            this.serverRequest = $.get(link, function (result) {
                this.setCarWashInForm(result);
            }.bind(this));
        }
    };

    setCarWashInForm(carWash){
        this.setState({
            name : {value : carWash.name, isValid:true},
            address     :  {value : carWash.address, isValid : true},
            phoneNumber :  {value : carWash.phoneNumber, isValid : true},
            boxCount    :  {value : carWash.boxCount, isValid : true},
            firstShift  :  {value : carWash.firstShift.substr(0,5), isValid : true},
            secondShift :  {value : carWash.secondShift.substr(0,5), isValid : true},
            isCarWashDownload : true,
            initialName : carWash.name,
            carWashId : carWash.id
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        let carWashData = {}

        for (let property in this.state){
            if (this.state[property].isValid !== undefined && this.state[property].isValid == false){
                //TODO: should inform that form is not valid ????
                this.setState({
                    errorDisplay : style.DISPLAY_BLOCK,
                    errorMessage : message.MESSAGE_FILL_FORM_FULLY
                })

                return
            }else if (this.state[property].value !== undefined) {
                carWashData[property] = this.state[property].value;
            }
        }
        carWashData['id'] = this.state.carWashId;

        let type = 'PUT';
        let msg = "Мойка " + carWashData['name'] + " была сохранена успешно"
        if (this.props.edit && this.props.id) {
            type = 'POST';
            msg = "Мойка " + carWashData['name'] + " была обновленна успешно"
        }

        $.ajax({
            url: '/carwash/',
            type: type,
            async: true,
            cache: false,
            contentType: 'application/json',
            data: JSON.stringify(carWashData),
            dataType: 'json',
            success: function(data) {
                if (data.message == 'Ok'){
                    this.props.saveInfo(msg)
                    browserHistory.push(urls.CAR_WASH_ALL);
                }
            }.bind(this),
            error: function(xhr, status, err) {
                //TODO: screen information about error for user
                console.error('/carwash/', status, err.toString());
            }.bind(this)
        })
    };

    handleNameChange(e, valid){
        this.setState({
            name : {
                value : e.target.value,
                isValid : valid
            }
        })
    }

    handleAddressChange(e, valid){
        this.setState({
            address : {
                value : e.target.value,
                isValid : valid
            }
        })
    }

    handlePhoneNumberChange (e, valid){
        this.setState({
            phoneNumber : {
                value : e.target.value,
                isValid : valid
            }
        })
    }
    
    handleBoxCountChange (e){
        this.setState({
            boxCount : {
                value : e.target.value,
                isValid : true
            }
        })
    }

    handleFirstShiftChange(e, valid){
        this.setState({
            firstShift : {
                value : e.target.value,
                isValid : valid
            }
        })
    }

    handleSecondShiftChange(e, valid){
        this.setState({
            secondShift : {
                value : e.target.value,
                isValid : valid
            }
        })
    }

    validationName(value){
        let result = false;
        if (value.toLocaleLowerCase() == this.state.initialName.toLowerCase()){
            result = true;
        }else {
            $.ajax({
                url: urls.CARWASH_IS_NAME_UNIQUE,
                type: 'GET',
                async: false,
                cache: false,
                data: {name : encodeURIComponent(value)},
                success: function(data) {
                    result = data
                }.bind(this),
                error: function(xhr, status, err) {
                    //TODO: screen information about error for user
                    console.error(urls.CARWASH_IS_NAME_UNIQUE, status, err.toString());
                }.bind(this)
            })
        }
        return result
    }

    validationTime(value){
        let re = new RegExp('([01]?[0-9]|2[0-3]):[0-5][0-9]');
        let result =  re.test(value);
        return result
    }

    render(){
        let mainFormStyle ={
            width: '50%'
        }

        let button = 'Добавить'
        if (this.props.edit){
            button = 'Обновить'
        }

        let data = <Loading/>



        if (!this.props.edit  || (this.props.edit && this.state.isCarWashDownload) ) {
            data =
                <form className="form-horizontal" onSubmit={this.handleSubmit} id="addCarWashForm">
                    <ErrorInformation
                        message={this.state.errorMessage}
                        display={this.state.errorDisplay}
                        uniqueName="carWashFormError"
                    />

                    <FormInputField
                        title="Название*:"
                        placeholder="Имя мойки"
                        name="name"
                        onChange={this.handleNameChange}
                        required={true}
                        maxLength={50}
                        validation={this.validationName}
                        errorMessage="Имя должно быть уникальным"
                        defaultValue={this.state.name.value}
                    />

                    <FormInputField
                        title="Адресс:"
                        placeholder="Адресс"
                        name="address"
                        onChange={this.handleAddressChange}
                        maxLength={200}
                        defaultValue={this.state.address.value}
                    />

                    <FormInputField
                        title="Телефон:"
                        placeholder="Номер телефонв"
                        name="phone_number"
                        onChange={this.handlePhoneNumberChange}
                        maxLength={50}
                        defaultValue={this.state.phoneNumber.value}
                    />

                    <SelectFiledForm
                        list={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                        name="boxCount"
                        title="Боксы:"
                        select={this.state.boxCount.value}
                        onChange={this.handleBoxCountChange}
                        defaultValue={this.state.boxCount.value}
                    />

                    <FormInputField
                        title="Первая смена*:"
                        placeholder="Время начала"
                        name="firstShift"
                        onChange={this.handleFirstShiftChange}
                        required={true}
                        maxLength={5}
                        validation={this.validationTime}
                        errorMessage={message.MESSAGE_TIME_FORMAT}
                        defaultValue={this.state.firstShift.value}
                    />

                    <FormInputField
                        title="Вторая смена*:"
                        placeholder="Время начала"
                        name="secondShift"
                        onChange={this.handleSecondShiftChange}
                        required={true}
                        maxLength={5}
                        validation={this.validationTime}
                        errorMessage={message.MESSAGE_TIME_FORMAT}
                        defaultValue={this.state.secondShift.value}
                    />

                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-success" onClick={this.props.resetInfoAndError}>{button}</button>
                        </div>
                    </div>

                </form>
        }

        return(
            <div style={mainFormStyle}>
                {data}
            </div>
        )
    }

}

