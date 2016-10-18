import React from 'react';
import {Link, browserHistory} from 'react-router'
import urls from './../../../constants/urls';

export default class AllCarWashTable extends React.Component{

    constructor(props) {
        super(props);
        this.generateHeaders = this.generateHeaders.bind(this);
        this.generateRows = this.generateRows.bind(this);
        this.removeCarWashHandler = this.removeCarWashHandler.bind(this);
        this.getAllCarWash = this.getAllCarWash.bind(this)
        this.state = {
            rows : []
        }
    };

    static propTypes = {
        cols : React.PropTypes.array.isRequired,
        resetInfoAndError : React.PropTypes.func.isRequired
    }

    generateHeaders() {
        let cols = this.props.cols;  // [{key, label}]
        return cols.map(function(colData) {
            return <th key={colData.key}> {colData.label} </th>;
        });
    }



    componentDidMount(){
        this.getAllCarWash()
    };

    getAllCarWash(){
        fetch("/carwash/all", {credentials: 'same-origin'})
            .then((response) => {
                response.json().then((data) => {
                    if (response.status == '200'){
                        this.setState({
                            rows: data
                        });
                    }
                });
            }).catch(()=> {
            //TODO: Handler for error
        })
    }

    removeCarWashHandler(name, id){
        //TODO: Confirmation Page => Are you sure want to delete this car wash ???

        fetch("/carwash/"+id,
            {
                method: "DELETE"
            })
            .then((response) => {
                response.json().then((data) => {
                    if(data.message = 'Ok'){
                        this.props.saveInfo('Мойка ' + name + ' была успешно удалена')
                        this.getAllCarWash();
                    }
                })
            })
            .catch(()=> {
                console.log('Fuck Up with carwash delete');
                //TODO: make handler for this fuck up
            })
    }

    generateRows() {
        let cols = this.props.cols,  // [{key, label}]
            data = this.state.rows;
        const s = this.props.selectId;
        const restInfoAndError = this.props.resetInfoAndError
        const removeCarWashHandler = this.removeCarWashHandler

        let editButtonStyle = {
            width : 90
        }

        let deleteButtonStyle = {
            marginLeft:10,
            width: 90
        }

        if (this.state.rows.length > 0) {
            let counter = 0;
            return data.map(function(item) {
                counter++;
                var cells = cols.map(function(colData) {
                    if (colData.key != "buttons" ){
                        let value = colData.key == "id" ? counter : item[colData.key]
                        return <td key={colData.key}>{value}</td>;
                    } else {
                        let link = urls.CAR_WASH_EDIT + "/" +item['id'];
                        return <td key={colData.key}>
                                        <Link to={link} >
                                            <button  type="button" className="btn btn-warning" style={editButtonStyle}
                                                     onClick={()=> restInfoAndError()}>
                                                Править
                                            </button>
                                        </Link>
                                        <button type="button" className="btn btn-danger" style={deleteButtonStyle}
                                                onClick={()=> removeCarWashHandler(item['name'], item['id'])}>
                                            Удалить
                                        </button>
                               </td>;
                    }

                });
                return <tr key={item.id}>{cells}</tr>;
            });
        }else {
            return <tr></tr>;
        }
    }

    render(){
        var titleStyle = {
            width:"50%"
        };

        let headers = this.generateHeaders();
        let rows = this.generateRows();

        return (
             <table className="table table-hove">
                 <thead>
                    <tr>
                        {headers}
                    </tr>
                 </thead>
                 <tbody>
                        {rows}
                 </tbody>

             </table>
        )
    }
}