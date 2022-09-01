import { ReactRenderer } from '@tiptap/react'
import tippy from 'tippy.js'
import CommandsList from './CommandsList'

const renderItems = () => {
  let component: any
  let popup: any

  return {
    onStart: (props: any) => {
      component = new ReactRenderer(CommandsList, {
        props,
        editor: props.editor,
      })

      popup = tippy('body', {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: 'manual',
        placement: 'bottom-start',
      })
    },

    onUpdate(props: any) {
      component.updateProps(props)

      popup[0].setProps({
        getReferenceClientRect: props.clientRect,
      })
    },

    onKeyDown(props: any) {
      if (props.event.key === 'Escape') {
        popup[0].hide()

        return true
      }

      return component.ref?.onKeyDown(props)
    },
  }
}

export default renderItems
