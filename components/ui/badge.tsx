import * as React from "react"
import { Icons } from "../icons"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children
  color?: string
  removable?: boolean
  onRemoved?: () => void
}

function Badge({
  children,
  color,
  removable = false,
  onRemoved,
  ...props
}: BadgeProps) {
  function getColorByBgColor(bgColor) {
    if (!bgColor) { return ''; }
    return (parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff';
  }

  return (
    <div
      className={`inline-flex items-center rounded-md border pl-2.5 pr-1.5 py-1 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2`}
      style={{
        backgroundColor: `#${color}`,
        color: getColorByBgColor(color)
      }}
      {...props}
    >
      { children }
      { removable ?
        <button
          type="button"
          className="flex-shrink-0 h-3 w-3 ml-1 rounded-full inline-flex items-center justify-center"
          onClick={onRemoved}
        >
          <Icons.clear
            className="w-4 h-4"
          />
        </button>
      : null}
    </div>
  )
}

export { Badge }