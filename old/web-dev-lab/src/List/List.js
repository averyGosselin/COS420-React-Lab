import React from "react"
import ListItem from "./ListItem"
import ListControls from "./ListControls"

class List extends React.Component {
    state = {
            listItems: [
                {
                    id: 1,
                    text: "List item 1"
                },
                {
                    id: 2,
                    text: "List item 2"
                },
                {
                    id: 3,
                    text: "List item 3"
                },
            ],
        }

    addItem = (text) => {
        var newItem = {id: this.state.listItems.length+1, text: text}
        var newArray = [...this.state.listItems]
        newArray.push(newItem)
        this.setState({listItems: newArray})
    };

    removeItem = (id) => {
        var newArray = [...this.state.listItems].filter((item) => item.id !== id)
        this.setState({listItems: newArray})
    };

    render() {
        return(
            <div>
                <ul>
                    {this.state.listItems.map(item => (
                        <ListItem
                            key={item.id}
                            id={item.id}
                            text={item.text}
                            removeItem={this.removeItem}
                        />
                    ))}
                </ul>
                <ListControls addItem={this.addItem} />
            </div>
        )
    }
}

export default List


