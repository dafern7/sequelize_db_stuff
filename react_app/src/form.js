import React, {Component} from 'react'

class Form extends Component {
    constructor(prop) {
        super(prop) //features from object parent
        this.initialState = {
            Device: '',
            Password: '',
        }

        this.state = this.initialState //assign initial state
    }

    modify = (event) => {
        const{name, value} = event.target //object that dispatched event

        this.setState({
            [name]: value,
        })
    }

    submitForm = () => {
        this.props.submitChar(this.state)
        this.setState(this.initialState)
    }


    render() {
        const { Device, Password} = this.state; //these unpacked variables cannot be the name of the states

        return (
            <form>
                <label for="Device">Device</label>
                <input
                    type="text"
                    name="Device"
                    id="Device"
                    value={Device}
                    onChange={this.modify}
                />

                <label for="Password">Password</label>
                <input
                    type="text" //make this type="password" for more security
                    name="Password"
                    id="Password"
                    value={Password}
                    onChange={this.modify}
                />

                <input type="button" value="Submit" onClick={this.submitForm}/>
            </form>


        );
    }
}

export default Form;