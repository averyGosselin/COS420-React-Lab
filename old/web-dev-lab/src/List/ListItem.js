import React from "react"

class ListItem extends React.Component {
    render() {
        return(
            <li>
                {this.props.text}
                <button onClick={() => this.props.removeItem(this.props.id)}>Remove</button>
            </li>
        )
    }
}

export default ListItem


