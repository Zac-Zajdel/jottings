import React, { Component, KeyboardEvent } from 'react'
import { DocumentTextIcon } from '@heroicons/react/outline'

interface Suggestions {
  section: string;
  options: Array<Options>;
}

interface Options {
  title: string;
  description: string;
  command: Function;
}

// Convert this to a functional component.
class CommandsList extends Component<{ items: Array<Suggestions>; command: Function }> {
  state = {
    selectedIndex: 0,
    optionIndex: 0,
  }

  componentDidUpdate(oldProps: { items: Array<Suggestions> }) {
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
        (this.state.selectedIndex + this.props.items[this.state.optionIndex].options.length - 1) %
        this.props.items[this.state.optionIndex].options.length,
    })
  }

  downHandler() {
    this.setState({
      selectedIndex:
        (this.state.selectedIndex + 1) % this.props.items[this.state.optionIndex].options.length,
    })
  }

  enterHandler() {
    this.selectItem(this.state.selectedIndex)
  }

  selectItem(index: number) {
    const item = this.props.items[this.state.optionIndex].options[index]

    if (item) {
      this.props.command(item)
    }
  }

  render() {
    const { items } = this.props as { items: Array<Suggestions>; command: Function }

    return (
      <div className="relative rounded text-sm w-64 bg-white">
        {items.map((item, index) => {
          return (
            <div key={index} className="p-2">
              <span className="block text-gray-600 mb-3 text-xs">{item.section}</span>

              <div>
                {item.options.map((option, index) => {
                  return (
                    <div key={index}>
                      <button
                        className={`item rounded flex items-center p-[4px] hover:bg-gray-200 ${
                          index === this.state.selectedIndex ? 'bg-gray-200' : null
                        }`}
                        onClick={() => this.selectItem(index)}
                      >
                        <div className="bg-white rounded border p-0.5 border-gray-400">
                          <DocumentTextIcon className="h-7 w-7 text-gray-400" />
                        </div>
                        <div className="ml-2 text-left">
                          <div className="text-gray-900">{option.title}</div>
                          <div className="text-gray-800 text-xs font-light">
                            {option.description}
                          </div>
                        </div>
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default CommandsList
