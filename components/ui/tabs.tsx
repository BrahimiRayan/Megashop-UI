import * as React from "react"

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, defaultValue, value, onValueChange, children, ...props }, ref) => {
    const [selectedTab, setSelectedTab] = React.useState(value || defaultValue || "")
    
    React.useEffect(() => {
      if (value !== undefined) {
        setSelectedTab(value)
      }
    }, [value])
    
    const handleTabChange = (newValue: string) => {
      setSelectedTab(newValue)
      onValueChange?.(newValue)
    }
    
    // Pass the current value and change handler to children
    const childrenWithProps = React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          selectedTab,
          onSelect: handleTabChange,
        })
      }
      return child
    })
    
    return (
      <div ref={ref} className={className} {...props}>
        {childrenWithProps}
      </div>
    )
  }
)
Tabs.displayName = "Tabs"

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  selectedTab?: string
  onSelect?: (value: string) => void
}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, selectedTab, onSelect, ...props }, ref) => {
    // Pass the current value and change handler to children
    const childrenWithProps = React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          selectedTab,
          onSelect,
        })
      }
      return child
    })
    
    return (
      <div
        ref={ref}
        className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 ${className}`}
        {...props}
      >
        {childrenWithProps}
      </div>
    )
  }
)
TabsList.displayName = "TabsList"

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  selectedTab?: string
  onSelect?: (value: string) => void
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, selectedTab, onSelect, children, ...props }, ref) => {
    const isActive = selectedTab === value
    
    return (
      <button
        ref={ref}
        className={`
          inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium
          ${isActive 
            ? 'bg-white text-black shadow-sm' 
            : 'text-gray-600 hover:text-gray-900'
          }
          ${className}
        `}
        onClick={() => onSelect?.(value)}
        {...props}
      >
        {children}
      </button>
    )
  }
)
TabsTrigger.displayName = "TabsTrigger"

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  selectedTab?: string
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, selectedTab, children, ...props }, ref) => {
    const isActive = selectedTab === value
    
    if (!isActive) return null
    
    return (
      <div
        ref={ref}
        className={`mt-2 ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }