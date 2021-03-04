import React from "react"

class ListControls extends React.Component {
    state = {
        text: ""
    }

    onChange = e => {
        this.setState({text: e.target.value})
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.addItem(this.state.text)
        this.setState({
            text: ""
        })
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="text" onChange={this.onChange} />
                <input type="submit" value="Add Item" />
            </form>
        )
    }
}

export default ListControls