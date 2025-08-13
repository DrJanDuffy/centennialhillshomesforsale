'use client';

import { useState } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    Avatar,
    AvatarFallback,
    AvatarImage,
    Badge,
    Bar,
    BarChart,
    BarChart3,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CartesianGrid,
    Checkbox,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DollarSign,
    formatCurrency,
    formatDate,
    formatNumber,
    Heart,
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
    Input,
    Label,
    Legend,
    Pie,
    PieChart,
    Progress,
    RadioGroup,
    RadioGroupItem,
    RechartsTooltip,
    // Chart components
    ResponsiveContainer,
    Search,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Separator,
    Settings,
    Slider,
    Switch,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    Textarea,
    toast,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    TrendingUp,
    User,
    XAxis,
    YAxis
} from '../utils/awesome-frameworks';

export default function AwesomeFrameworkDemo() {
  const [progress, setProgress] = useState(33);
  const [sliderValue, setSliderValue] = useState([50]);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [selectedTab, setSelectedTab] = useState('components');

  const showToast = () => {
    toast.success('This is an awesome toast notification! 🎉');
  };

  const chartData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-gray-900">
            🚀 Awesome Frameworks Demo
          </h1>
          <p className="text-xl text-gray-600">
            Showcasing the powerful frameworks that make this site amazing!
          </p>
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="forms">Forms</TabsTrigger>
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="utilities">Utilities</TabsTrigger>
          </TabsList>

          {/* Components Tab */}
          <TabsContent value="components" className="space-y-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Dialog Demo */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Dialog Component
                  </CardTitle>
                  <CardDescription>
                    Beautiful modal dialogs with Radix UI
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Open Dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input id="name" defaultValue="John Doe" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className="text-right">
                            Email
                          </Label>
                          <Input id="email" defaultValue="john@example.com" className="col-span-3" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button>Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              {/* Accordion Demo */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Accordion Component
                  </CardTitle>
                  <CardDescription>
                    Collapsible content sections
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>What is Centennial Hills?</AccordionTrigger>
                      <AccordionContent>
                        Centennial Hills is a master-planned community in Northwest Las Vegas, known for its beautiful homes, excellent schools, and family-friendly atmosphere.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Why choose this area?</AccordionTrigger>
                      <AccordionContent>
                        The area offers great value, modern amenities, and a strong sense of community. It&apos;s perfect for families and professionals alike.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              {/* Progress & Slider Demo */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Progress & Slider
                  </CardTitle>
                  <CardDescription>
                    Interactive progress indicators
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Progress: {progress}%</Label>
                    <Progress value={progress} className="w-full" />
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => setProgress(Math.min(100, progress + 10))}
                    >
                      Increase Progress
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label>Slider: {sliderValue[0]}</Label>
                    <Slider
                      value={sliderValue}
                      onValueChange={setSliderValue}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Interactive Controls */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Interactive Controls
                  </CardTitle>
                  <CardDescription>
                    Switches, checkboxes, and radio buttons
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={switchChecked}
                      onCheckedChange={setSwitchChecked}
                    />
                    <Label>Enable notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={checkboxChecked}
                      onCheckedChange={setCheckboxChecked}
                    />
                    <Label>Accept terms</Label>
                  </div>
                  <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option1" id="option1" />
                      <Label htmlFor="option1">Option 1</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option2" id="option2" />
                      <Label htmlFor="option2">Option 2</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Avatar & Hover Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Avatar & Hover Card
                  </CardTitle>
                  <CardDescription>
                    User avatars with hover information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Avatar className="cursor-pointer">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">Dr. Jan Duff</h4>
                          <p className="text-sm text-muted-foreground">
                            Real Estate Expert
                          </p>
                          <div className="flex items-center pt-2">
                            <Heart className="mr-2 h-4 w-4 opacity-70" />
                            <span className="text-xs text-muted-foreground">
                              Centennial Hills Specialist
                            </span>
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </CardContent>
              </Card>

              {/* Tooltip Demo */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Tooltip Component
                  </CardTitle>
                  <CardDescription>
                    Hover for additional information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline">Hover me</Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>This is a helpful tooltip!</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Forms Tab */}
          <TabsContent value="forms" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Form Components</CardTitle>
                <CardDescription>
                  Beautiful forms with validation and modern UI
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="property-type">Property Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single-family">Single Family</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price-range">Price Range</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select price range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="200-300k">$200k - $300k</SelectItem>
                        <SelectItem value="300-400k">$300k - $400k</SelectItem>
                        <SelectItem value="400-500k">$400k - $500k</SelectItem>
                        <SelectItem value="500k+">$500k+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Property Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your dream property..."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="flex gap-4">
                  <Button onClick={showToast}>Show Toast</Button>
                  <Button variant="outline">Reset Form</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Charts Tab */}
          <TabsContent value="charts" className="space-y-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Market Trends
                  </CardTitle>
                  <CardDescription>
                    Property value trends over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <RechartsTooltip />
                        <Bar dataKey="value" fill="#3A8DDE" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Property Distribution
                  </CardTitle>
                  <CardDescription>
                    Types of properties in the area
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Single Family', value: 60, fill: '#3A8DDE' },
                            { name: 'Townhouse', value: 25, fill: '#16B286' },
                            { name: 'Condo', value: 15, fill: '#F59E0B' },
                          ]}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                        />
                        <RechartsTooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Utilities Tab */}
          <TabsContent value="utilities" className="space-y-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Formatting Utilities
                  </CardTitle>
                  <CardDescription>
                    Number and currency formatting
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">
                    <p><strong>Currency:</strong> {formatCurrency(850000)}</p>
                    <p><strong>Number:</strong> {formatNumber(1234567)}</p>
                    <p><strong>Date:</strong> {formatDate(new Date())}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Utility Functions
                  </CardTitle>
                  <CardDescription>
                    Helper functions for common tasks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p><strong>CN Function:</strong> Combines class names</p>
                    <p><strong>Debounce:</strong> Limits function calls</p>
                    <p><strong>Throttle:</strong> Controls execution frequency</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge className="h-5 w-5" />
                    Badge System
                  </CardTitle>
                  <CardDescription>
                    Status and category indicators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default">Available</Badge>
                    <Badge variant="secondary">Under Contract</Badge>
                    <Badge variant="destructive">Sold</Badge>
                    <Badge variant="outline">New Listing</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-16 text-center">
          <Separator className="mb-8" />
          <p className="text-gray-600">
            Built with ❤️ using the most awesome frameworks available
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <Badge variant="outline">Radix UI</Badge>
            <Badge variant="outline">Headless UI</Badge>
            <Badge variant="outline">Tailwind CSS</Badge>
            <Badge variant="outline">Framer Motion</Badge>
            <Badge variant="outline">React Hook Form</Badge>
            <Badge variant="outline">Zod</Badge>
            <Badge variant="outline">Recharts</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
