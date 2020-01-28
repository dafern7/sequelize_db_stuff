import React, { Component } from 'react'
import Table from './table'
import Form from './form'

class App extends Component {
    state = {
        characters: [],
    }
    removeChar = index => {
        const {characters} = this.state
    
        this.setState({
            characters: characters.filter((character,i) => {
                return i !== index
            }),
        })
    }

    submitChar = character => {
        this.setState({characters: [...this.state.characters,character]}) //update the state characters with the new character submission
    }


    render() {
        const {characters} = this.state

        return (
            <div className="container">
                <Table characterData = {characters} removeChar = {this.removeChar} />
                <Form submitChar={this.submitChar} />
            </div>
        )

        
    }

    
}



export default App