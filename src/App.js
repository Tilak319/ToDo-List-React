import React from "react";
import "./App.css";
import List from "./List.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHiking, faTrash } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: {
        text: "",
        key: "",
      },
    };
    this.handleInput = this.handleInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }

  handleInput(e) {
    this.setState({
      currentItem: {
        text: e.target.value,
        key: Date.now(),
      },
    });
  }

  addItem(e) {
    e.preventDefault();
    const newItem = this.state.currentItem;
    console.log(newItem);
    if (newItem.text !== "") {
      const items = [...this.state.items, newItem];
      this.setState({
        items: items,
        currentItem: {
          text: "",
          key: "",
        },
      });
    }
  }

  deleteItem(key) {
    const filteredItems = this.state.items.filter((item) => item.key !== key);

    this.setState({
      items: filteredItems,
    });
  }

  setUpdate(text, key) {
    const items = this.state.items;
    items.map((item) => {
      if (item.key === key) {
        item.text = text;
      }
    });
    this.setState({
      items: items,
    });
  }

  render() {
    return (
      <>
        <header className="App-header">
          <div className="App-div">
            <h3>To-DO List</h3>
            <form id="to-do-form" onSubmit={this.addItem}>
              <input
                type="text"
                placeholder="Enter your things To Do"
                value={this.state.currentItem.text}
                onChange={this.handleInput}
              />
              <button type="submit">ADD</button>
              <List
                items={this.state.items}
                deleteItem={this.deleteItem}
                setUpdate={this.setUpdate}
              ></List>
            </form>
          </div>
        </header>
      </>
    );
  }
}

export default App;