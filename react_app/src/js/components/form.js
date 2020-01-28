import React, {Component} from "react";
import {connect} from "react-redux";
import {addDevice} from "../actions/index";

function mapDispatchToProps(dispatch) {
    return {
        addDevice: device_name => dispatch(addDevice(device_name))
    }
}

class ConnectedForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            device_name: ""
        };
        this.modify = this.modify.bind(this)
        this.submission = this.submission.bind(this)
    }

    modify(event) {
        this.setState({ [event.target.id]: event.target.value});
    }

    submission(event) {
        event.preventDefault();
        const { device_name } = this.state;
        this.props.addDevice({ device_name });
        this.setState({ device_name: "" });
    }

    render() {
        const { device_name } = this.state;
        return(
            <form onSubmit={this.submission}>
                <div>
                    <label htmlFor="device_name">Verify New Device</label>
                    <input
                        type="text"
                        id="device_name"
                        value={device_name}
                        onChange={this.modify}
                    />
                </div>
                <button type="submit">SAVE</button>
            </form>
        );
    }
}

const Form = connect(
    null,
    mapDispatchToProps
)(ConnectedForm);

export default Form