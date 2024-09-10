import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { ScrollArea } from "./ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { ArrowUpRight, TrendingUp } from "lucide-react"

export default function TrendsDashboard() {
  return (
    <div className="container mx-auto p-4 space-y-4">
      <header className="flex items-center justify-between py-4">
        <h1 className="text-3xl font-bold">TrendSpot</h1>
        <nav className="flex space-x-4">
          <a href="#" className="text-sm font-medium hover:underline">
            Home
          </a>
          <a href="#" className="text-sm font-medium hover:underline">
            Categories
          </a>
          <a href="#" className="text-sm font-medium hover:underline">
            About
          </a>
        </nav>
      </header>

      <main className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Top Trends</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TrendCard title="News" icon={<TrendingUp className="h-4 w-4" />}>
              <ol className="space-y-2">
                <li className="flex items-center justify-between">
                  <span className="text-sm">Global climate summit begins</span>
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm">Tech giant launches new AI product</span>
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm">Major sports upset in championship game</span>
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                </li>
              </ol>
            </TrendCard>
            <TrendCard title="Videos" icon={<TrendingUp className="h-4 w-4" />}>
              <div className="space-y-2">
                <ThumbnailItem
                  title="DIY home renovation tips"
                  views="1.2M views"
                  image="/placeholder.svg?height=80&width=120"
                />
                <ThumbnailItem
                  title="Easy 15-minute recipes"
                  views="890K views"
                  image="/placeholder.svg?height=80&width=120"
                />
                <ThumbnailItem
                  title="Morning yoga routine"
                  views="650K views"
                  image="/placeholder.svg?height=80&width=120"
                />
              </div>
            </TrendCard>
            <TrendCard title="Social" icon={<TrendingUp className="h-4 w-4" />}>
              <div className="space-y-2">
                <SocialItem
                  username="@techguru"
                  content="Just tried the new VR headset. Mind blown! 🤯 #VRtech"
                  likes="15.2K"
                  shares="5.7K"
                />
                <SocialItem
                  username="@foodielove"
                  content="This new restaurant in town is a must-try! 😋🍽️ #foodie"
                  likes="8.9K"
                  shares="3.2K"
                />
                <SocialItem
                  username="@travelbug"
                  content="Hidden gems in Bali you won't believe! 🏝️✨ #travelgram"
                  likes="12.5K"
                  shares="4.8K"
                />
              </div>
            </TrendCard>
            <TrendCard title="Amazon Sales" icon={<TrendingUp className="h-4 w-4" />}>
              <div className="space-y-2">
                <ProductItem
                  name="Wireless Earbuds"
                  price="$79.99"
                  discount="20% off"
                  image="/placeholder.svg?height=50&width=50"
                />
                <ProductItem
                  name="Smart Home Hub"
                  price="$129.99"
                  discount="15% off"
                  image="/placeholder.svg?height=50&width=50"
                />
                <ProductItem
                  name="Fitness Tracker"
                  price="$49.99"
                  discount="30% off"
                  image="/placeholder.svg?height=50&width=50"
                />
              </div>
            </TrendCard>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Trending Categories</h2>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:w-1/2">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="tech">Tech</TabsTrigger>
              <TabsTrigger value="entertainment">Entertainment</TabsTrigger>
              <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                <div className="flex w-max space-x-4 p-4">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <Card key={i} className="w-[250px] shrink-0">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Trend {i + 1}</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">#{i + 1}</div>
                        <p className="text-xs text-muted-foreground">
                          +20% from last week
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="tech">Tech trends content here</TabsContent>
            <TabsContent value="entertainment">Entertainment trends content here</TabsContent>
            <TabsContent value="lifestyle">Lifestyle trends content here</TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  )
}

function TrendCard({ title, children, icon }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

function ThumbnailItem({ title, views, image }) {
  return (
    <div className="flex items-center space-x-2">
      <img src={`https://via.placeholder.com/120x80`} alt={title} className="w-20 h-14 object-cover rounded" />
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{views}</p>
      </div>
    </div>
  )
}

function SocialItem({ username, content, likes, shares }) {
  return (
    <div className="space-y-1">
      <p className="text-sm font-medium">{username}</p>
      <p className="text-sm">{content}</p>
      <div className="flex space-x-2 text-xs text-muted-foreground">
        <span>{likes} likes</span>
        <span>{shares} shares</span>
      </div>
    </div>
  )
}

function ProductItem({ name, price, discount, image }) {
  return (
    <div className="flex items-center space-x-2">
      <img src={`https://via.placeholder.com/50x50`} alt={name} className="w-12 h-12 object-cover rounded" />
      <div>
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs">{price} <span className="text-green-500">{discount}</span></p>
      </div>
    </div>
  )
}