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
    <div className="flex items-center justify-between mx-8 py-6 sticky top-14 bg-background -mt-[2.5]">
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  )
}
