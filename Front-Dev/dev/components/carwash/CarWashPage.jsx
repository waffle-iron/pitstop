import React from 'react';
import TitleWithAddButton from './../TitleWithAddButton.jsx';
import AllCarWashTable from './subComponents/AllCarWashTable.jsx'
import CarWashFormContainer from './../../containers/CarWashFormContainer';


export default class CarWashPage extends React.Component{

    constructor(props) {
        super(props);
    };

    render(){
        var carWashPageStyle = {
            paddingLeft: 10,
            paddingRight: 10
        }

        let body;
        let title;
        let addButton = true
        
        if (this.props.params.action && this.props.params.action == 'add') {
            body = <CarWashFormContainer/>;
            title = 'Добавить мойку'
            addButton = false
        }else if (this.props.params.action == 'edit' && this.props.params.id){
            body = <CarWashFormContainer edit="true" id={this.props.params.id}/>;
            title = 'Редактировать мойку'
            addButton = false
        }else {
            body = <AllCarWashTable
                cols = {[ {key: "id", label: "#" },
                              {key: "name", label: "Название" },
                              {key: "address", label: "Адрес" },
                              {key: "phoneNumber", label: "Телефон" },
                              {key: "buttons", label: "" }] }
                resetInfoAndError = {this.props.resetInfoAndError}
                saveInfo = {this.props.saveInfo}
            />
            title = 'Все мойки'
        }

        return (
           <div style={carWashPageStyle}> 
                <TitleWithAddButton title={title} addButton={addButton} resetInfoAndError={this.props.resetInfoAndError}/>
               {body}
           </div>    
        )
    }
}
