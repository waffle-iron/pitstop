import React from 'react';
import {Link} from 'react-router'

export default class TitleWithAddButton extends React.Component{

    constructor(props){
        super(props);
    }

     render(){
         let titleStyle = {
            width:"50%"
         };
         
         let buttonStyle = {
             width: "10%",
             float: "right"
         };

         let button;
         if (this.props.addButton){
             button = (
                 <div>
                     <Link to="/carwash/add">
                         <button type="button" className="btn btn-success" style={buttonStyle} onClick={()=> this.props.resetInfoAndError()}>
                            Добавить
                         </button>
                     </Link>
                 </div>
             )
         }

        return (
            <div className="title-with-add-button">
                {button}
                <h2 style={titleStyle}>{this.props.title}:</h2>
            </div>
        )
    }
}



