import React, { Component, KeyboardEvent } from 'react'

interface Item {
  title: string;
  command: Function;
}

// Convert this to a functional component.
class CommandsList extends Component<{ items: Array<Item>; command: Function }> {
  state = {
    selectedIndex: 0,
  }

  componentDidUpdate(oldProps: { items: Array<Item> }) {
    if (this.props.items !== oldProps.items) {
      this.setState({
        selectedIndex: 0,
      })
    }
  }

  onKeyDown({ event }: { event: KeyboardEvent }) {
    if (event.key === 'ArrowUp') {
      this.upHandler()
      return true
    }

    if (event.key === 'ArrowDown') {
      this.downHandler()
      return true
    }

    if (event.key === 'Enter') {
      this.enterHandler()
      return true
    }

    return false
  }

  upHandler() {
    this.setState({
      selectedIndex:
        (this.state.selectedIndex + this.props.items.length - 1) % this.props.items.length,
    })
  }

  downHandler() {
    this.setState({
      selectedIndex: (this.state.selectedIndex + 1) % this.props.items.length,
    })
  }

  enterHandler() {
    this.selectItem(this.state.selectedIndex)
  }

  selectItem(index: number) {
    const item = this.props.items[index]

    if (item) {
      this.props.command(item)
    }
  }

  render() {
    const { items } = this.props as { items: Array<Item>; command: Function }

    return (
      <div className="items">
        {items.map((item, index) => {
          return (
            <button
              className={`item ${index === this.state.selectedIndex ? 'is-selected' : ''}`}
              key={index}
              onClick={() => this.selectItem(index)}
            >
              {item.title}
            </button>
          )
        })}
      </div>
    )
  }
}

export default CommandsList
