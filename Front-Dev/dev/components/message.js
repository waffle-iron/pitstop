import React from 'react';
import { Link } from 'react-router'

export default class Message extends React.Component{

    constructor(props) {
        super(props);
    };

    render() {
        const style = {
            padding:15
        }
        let info;
        if (this.props.info) {
            info = <p className="bg-success" style={style}>{this.props.info}</p>
        }

        let error;
        if (this.props.error) {
            error = <p className="bg-danger" style={style}>{this.props.error}</p>
        }

        return (
          <div>
              {error}
              {info}
          </div>
        );
    }
};