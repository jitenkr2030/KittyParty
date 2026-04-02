'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { 
  Users, 
  Calendar, 
  DollarSign, 
  Gift, 
  MessageCircle, 
  Gamepad2, 
  Trophy,
  Sparkles,
  Plus,
  Search,
  Bell,
  Settings,
  LogOut,
  Home,
  CreditCard,
  PartyPopper,
  Star,
  Clock,
  MapPin,
  ChefHat,
  ShoppingBag,
  Send,
  Mic
} from 'lucide-react'
import TambolaGame from '@/components/games/tambola'
import SpinWheel from '@/components/games/spin-wheel'

export default function KittyPartyApp() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<any[]>([])

  // Mock data for demonstration
  const myGroups = [
    { id: 1, name: 'Mumbai Queens', members: 8, nextMeeting: '2024-02-15', contribution: 1000 },
    { id: 2, name: 'Ladies Circle', members: 6, nextMeeting: '2024-02-20', contribution: 500 },
  ]

  const upcomingEvents = [
    { id: 1, title: 'Bollywood Theme Party', date: '2024-02-15', group: 'Mumbai Queens', attendees: 7 },
    { id: 2, title: 'Diwali Celebration', date: '2024-02-20', group: 'Ladies Circle', attendees: 5 },
  ]

  const recentActivity = [
    { id: 1, type: 'payment', message: 'You paid ₹1000 for Mumbai Queens', time: '2 hours ago' },
    { id: 2, type: 'event', message: 'New event: Bollywood Theme Party', time: '5 hours ago' },
    { id: 3, type: 'message', message: 'Priya sent a message in Mumbai Queens', time: '1 day ago' },
  ]

  const availableGames = [
    { id: 1, name: 'Tambola', icon: '🎫', players: '2-20', duration: '30-45 min', component: 'tambola' },
    { id: 2, name: 'Spin the Wheel', icon: '🎯', players: '1-10', duration: '5-10 min', component: 'spin-wheel' },
    { id: 3, name: 'Musical Chairs', icon: '🪑', players: '5-15', duration: '10-15 min', component: null },
    { id: 4, name: 'Antakshari', icon: '🎵', players: '4-20', duration: '20-30 min', component: null },
  ]

  const foodServices = [
    { id: 1, name: 'Snack Party Pack', price: 299, items: 'Samosa, Pakoda, Chips' },
    { id: 2, name: 'Full Catering Package', price: 999, items: 'Starters, Main Course, Desserts' },
    { id: 3, name: 'Dessert Bundle', price: 199, items: 'Gulab Jamun, Rasgulla, Ice Cream' },
  ]

  const chatMessages = [
    { id: 1, sender: 'Priya', message: 'Hey everyone! Excited for the party!', time: '10:30 AM', isMe: false },
    { id: 2, sender: 'You', message: 'Me too! What should I bring?', time: '10:32 AM', isMe: true },
    { id: 3, sender: 'Anjali', message: 'Just bring yourself! 🎉', time: '10:35 AM', isMe: false },
  ]

  const handleGameComplete = (score: number) => {
    alert(`🎉 Game completed! You scored ${score} points!`)
    setSelectedGame(null)
  }

  const sendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send via WebSocket
      console.log('Sending message:', message)
      setMessage('')
    }
  }

  const renderGame = () => {
    switch (selectedGame) {
      case 'tambola':
        return <TambolaGame onGameComplete={handleGameComplete} />
      case 'spin-wheel':
        return <SpinWheel onGameComplete={handleGameComplete} />
      default:
        return null
    }
  }

  if (selectedGame) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="outline" 
              onClick={() => setSelectedGame(null)}
            >
              ← Back to Games
            </Button>
            <h1 className="text-2xl font-bold">
              {availableGames.find(g => g.component === selectedGame)?.name}
            </h1>
            <div className="w-20"></div>
          </div>
          {renderGame()}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <PartyPopper className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">KittyParty.org</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/avatars/user1.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navigation Tabs */}
          <TabsList className="grid w-full grid-cols-6 bg-white shadow-sm">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Groups</span>
            </TabsTrigger>
            <TabsTrigger value="money" className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">Money</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Events</span>
            </TabsTrigger>
            <TabsTrigger value="games" className="flex items-center space-x-2">
              <Gamepad2 className="w-4 h-4" />
              <span className="hidden sm:inline">Games</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center space-x-2">
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Services</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">My Groups</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{myGroups.length}</div>
                  <p className="text-pink-100 text-sm">Active kitty groups</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Total Saved</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₹12,000</div>
                  <p className="text-blue-100 text-sm">Across all groups</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Rewards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">450</div>
                  <p className="text-green-100 text-sm">Points earned</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Groups</CardTitle>
                  <CardDescription>Your active kitty party groups</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {myGroups.map(group => (
                    <div key={group.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{group.name}</h4>
                        <p className="text-sm text-gray-600">{group.members} members • ₹{group.contribution}/month</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Next: {group.nextMeeting}</p>
                        <Badge variant="outline" className="text-xs">Active</Badge>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Join New Group
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Don't miss the next party!</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-gray-600">{event.group} • {event.attendees} attending</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{event.date}</p>
                        <Badge variant="secondary" className="text-xs">Upcoming</Badge>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map(activity => (
                    <div key={activity.id} className="flex items-center space-x-3 p-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Groups Tab */}
          <TabsContent value="groups" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Groups</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create New Group
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myGroups.map(group => (
                <Card key={group.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <Badge>Active</Badge>
                    </div>
                    <CardDescription>{group.members} members</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="w-4 h-4 mr-2" />
                        ₹{group.contribution} per month
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        Next: {group.nextMeeting}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        {group.members} active members
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">View Details</Button>
                      <Button size="sm" className="flex-1">Enter Group</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Money Tab */}
          <TabsContent value="money" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Money Management</h2>
              <Button>
                <CreditCard className="w-4 h-4 mr-2" />
                Make Payment
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Contribution Ledger</CardTitle>
                  <CardDescription>Track all your monthly contributions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['January 2024', 'February 2024', 'March 2024'].map((month, index) => (
                      <div key={month} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{month}</h4>
                          <p className="text-sm text-gray-600">Mumbai Queens • Ladies Circle</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{1500 + index * 500}</p>
                          <Badge variant={index === 0 ? "default" : "secondary"}>
                            {index === 0 ? "Paid" : index === 1 ? "Pending" : "Upcoming"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Contributed</span>
                    <span className="font-medium">₹12,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Received</span>
                    <span className="font-medium text-green-600">₹8,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending</span>
                    <span className="font-medium text-orange-600">₹1,500</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Net Balance</span>
                    <span className="text-green-600">₹6,500</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Events & Parties</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map(event => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <Badge variant="outline">Upcoming</Badge>
                    </div>
                    <CardDescription>{event.group}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        Location: To be decided
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        {event.attendees} people attending
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Theme: Bollywood
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">View Details</Button>
                      <Button size="sm" className="flex-1">RSVP</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Games Tab */}
          <TabsContent value="games" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Party Games</h2>
              <Button>
                <Gamepad2 className="w-4 h-4 mr-2" />
                Start New Game
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {availableGames.map(game => (
                <Card key={game.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-2">{game.icon}</div>
                    <CardTitle className="text-lg">{game.name}</CardTitle>
                    <CardDescription>{game.players} players</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {game.duration}
                      </div>
                    </div>
                    <Button 
                      className="w-full mt-3" 
                      size="sm"
                      onClick={() => game.component && setSelectedGame(game.component)}
                    >
                      {game.component ? 'Play Now' : 'Coming Soon'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Game Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { game: 'Tambola', date: '2024-02-10', winner: 'Priya', score: 95 },
                    { game: 'Spin the Wheel', date: '2024-02-08', winner: 'You', score: 100 },
                    { game: 'Musical Chairs', date: '2024-02-05', winner: 'Anjali', score: 85 },
                  ].map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{session.game}</h4>
                        <p className="text-sm text-gray-600">{session.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Winner: {session.winner}</p>
                        <Badge variant="outline">{session.score} pts</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Party Services & Booking</h2>
              <Badge variant="secondary" className="text-sm">
                <Sparkles className="w-4 h-4 mr-1" />
                New Feature
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ChefHat className="w-5 h-5 mr-2" />
                    Food & Catering
                  </CardTitle>
                  <CardDescription>Order food packages for your party</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {foodServices.map(service => (
                    <div key={service.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{service.name}</h4>
                        <p className="text-sm text-gray-600">{service.items}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{service.price}</p>
                        <Button size="sm" variant="outline">Order</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Gift className="w-5 h-5 mr-2" />
                    Party Decor & Supplies
                  </CardTitle>
                  <CardDescription>Book decorations and party supplies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: 'Bollywood Theme Decor', price: 799 },
                    { name: 'Festival Decoration Kit', price: 599 },
                    { name: 'Balloon & Flower Setup', price: 399 },
                  ].map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{service.name}</h4>
                        <p className="text-sm text-gray-600">Complete setup included</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{service.price}</p>
                        <Button size="sm" variant="outline">Book</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-purple-100 to-pink-100">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  AI Party Planner
                </CardTitle>
                <CardDescription>Get personalized suggestions for your next party</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col">
                    <Star className="w-6 h-6 mb-2" />
                    <span>Theme Ideas</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col">
                    <ChefHat className="w-6 h-6 mb-2" />
                    <span>Food Menu</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col">
                    <Gamepad2 className="w-6 h-6 mb-2" />
                    <span>Game Selection</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}