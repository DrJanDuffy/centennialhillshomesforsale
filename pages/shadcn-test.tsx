import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export default function ShadcnTest() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">shadcn/ui Real Estate Components</h1>
        <p className="text-lg text-muted-foreground">Complete component library for your real estate website</p>
      </div>

      <Separator />

      {/* Property Search Form */}
      <Card>
        <CardHeader>
          <CardTitle>Property Search Form</CardTitle>
          <CardDescription>Enhanced form using shadcn/ui components</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Enter city, neighborhood, or ZIP" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="property-type">Property Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single-family">Single Family Home</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                  <SelectItem value="condo">Condominium</SelectItem>
                  <SelectItem value="luxury">Luxury Estate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="min-price">Min Price</Label>
              <Input id="min-price" type="number" placeholder="$500,000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-price">Max Price</Label>
              <Input id="max-price" type="number" placeholder="$1,500,000" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="pool" />
            <Label htmlFor="pool">Pool</Label>
            <Checkbox id="garage" />
            <Label htmlFor="garage">Garage</Label>
            <Checkbox id="mountain-views" />
            <Label htmlFor="mountain-views">Mountain Views</Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Search Properties</Button>
        </CardFooter>
      </Card>

      {/* Property Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg"></div>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">123 Mountain View Dr</CardTitle>
              <Badge variant="success">For Sale</Badge>
            </div>
            <CardDescription>Centennial Hills, Las Vegas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Price</span>
                <span className="font-semibold">$875,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Bedrooms</span>
                <span>4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Bathrooms</span>
                <span>3.5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Square Feet</span>
                <span>2,850</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mt-3">
              <Badge variant="outline">Pool</Badge>
              <Badge variant="outline">Garage</Badge>
              <Badge variant="outline">Mountain Views</Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">View Details</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>123 Mountain View Dr</DialogTitle>
                  <DialogDescription>
                    Stunning luxury home in Centennial Hills with panoramic mountain views
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
                  <p className="text-sm text-muted-foreground">
                    This beautiful home features an open floor plan, gourmet kitchen, and master suite with 
                    private balcony. Located in the prestigious Centennial Hills neighborhood.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <div className="aspect-video bg-gradient-to-br from-green-500 to-teal-600 rounded-t-lg"></div>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">456 Skye Canyon Blvd</CardTitle>
              <Badge variant="info">New Listing</Badge>
            </div>
            <CardDescription>Skye Canyon, Las Vegas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Price</span>
                <span className="font-semibold">$650,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Bedrooms</span>
                <span>3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Bathrooms</span>
                <span>2.5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Square Feet</span>
                <span>2,200</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mt-3">
              <Badge variant="outline">Modern Kitchen</Badge>
              <Badge variant="outline">Hardwood Floors</Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Contact Agent</Button>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-600 rounded-t-lg"></div>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">789 Providence Way</CardTitle>
              <Badge variant="warning">Price Reduced</Badge>
            </div>
            <CardDescription>Providence, Las Vegas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Price</span>
                <span className="font-semibold">$725,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Bedrooms</span>
                <span>5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Bathrooms</span>
                <span>4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Square Feet</span>
                <span>3,200</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mt-3">
              <Badge variant="outline">Large Lot</Badge>
              <Badge variant="outline">Updated Kitchen</Badge>
              <Badge variant="outline">Master Suite</Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="secondary" className="w-full">Schedule Tour</Button>
          </CardFooter>
        </Card>
      </div>

      {/* Property Details Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
          <CardDescription>Comprehensive property information with tabs</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="neighborhood">Neighborhood</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <p className="text-sm text-muted-foreground">
                This stunning luxury home in Centennial Hills offers the perfect blend of comfort and elegance. 
                With 4 bedrooms, 3.5 bathrooms, and 2,850 square feet of living space, this property provides 
                ample room for families of all sizes.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Year Built</Label>
                  <p className="text-sm">2018</p>
                </div>
                <div className="space-y-2">
                  <Label>Lot Size</Label>
                  <p className="text-sm">0.25 acres</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="features" className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Badge variant="outline">Granite Countertops</Badge>
                <Badge variant="outline">Stainless Appliances</Badge>
                <Badge variant="outline">Hardwood Floors</Badge>
                <Badge variant="outline">Crown Molding</Badge>
                <Badge variant="outline">Walk-in Closets</Badge>
                <Badge variant="outline">Central Air</Badge>
              </div>
            </TabsContent>
            <TabsContent value="neighborhood" className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Centennial Hills is one of Las Vegas's most desirable master-planned communities, 
                offering excellent schools, shopping, and recreational facilities.
              </p>
            </TabsContent>
            <TabsContent value="contact" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="Enter your phone number" />
                </div>
                <Button className="w-full">Request Information</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Mobile Navigation Sheet */}
      <div className="flex justify-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Mobile Menu</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Navigation Menu</SheetTitle>
              <SheetDescription>
                Browse our real estate services and listings
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <Button variant="ghost" className="justify-start">Properties</Button>
              <Button variant="ghost" className="justify-start">Neighborhoods</Button>
              <Button variant="ghost" className="justify-start">Market Data</Button>
              <Button variant="ghost" className="justify-start">About</Button>
              <Button variant="ghost" className="justify-start">Contact</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
