interface PageHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function PageHeader({
  heading,
  text,
  children,
}: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2 pb-3 sticky top-0 bg-background">
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  )
}
