import { Button } from "@/components/ui/button"

export default function ShadcnTest() {
  return (
    <div className="container mx-auto p-8 space-y-4">
      <h1 className="text-3xl font-bold mb-8">shadcn/ui Test Page</h1>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Button Variants</h2>
        
        <div className="flex flex-wrap gap-4">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
        
        <h2 className="text-xl font-semibold mt-8">Button Sizes</h2>
        
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">🚀</Button>
        </div>
        
        <h2 className="text-xl font-semibold mt-8">Button States</h2>
        
        <div className="flex flex-wrap gap-4">
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
          <Button asChild>
            <a href="/">As Child (Link)</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
