'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
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
  Home,
  CreditCard,
  PartyPopper,
  Star,
  Clock,
  MapPin,
  ChefHat,
  ShoppingBag,
  LogOut,
  Edit,
  Trash2
} from 'lucide-react'
import TambolaGame from '@/components/games/tambola'
import SpinWheel from '@/components/games/spin-wheel'

interface Group {
  id: string
  name: string
  description?: string
  monthlyAmount: number
  memberCount: number
  createdAt: string
}

interface Event {
  id: string
  title: string
  description?: string
  date: string
  location?: string
  theme?: string
  groupId: string
  groupName: string
  attendeeCount: number
}

interface Contribution {
  id: string
  amount: number
  month: string
  status: 'paid' | 'pending' | 'overdue'
  groupName: string
  paidAt?: string
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  
  // State for groups
  const [groups, setGroups] = useState<Group[]>([])
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [newGroup, setNewGroup] = useState({ name: '', description: '', monthlyAmount: 1000 })
  
  // State for events
  const [events, setEvents] = useState<Event[]>([])
  const [showCreateEvent, setShowCreateEvent] = useState(false)
  const [newEvent, setNewEvent] = useState({ 
    title: '', 
    description: '', 
    date: '', 
    location: '', 
    theme: '', 
    groupId: '' 
  })
  
  // State for contributions
  const [contributions, setContributions] = useState<Contribution[]>([])
  const [showPayment, setShowPayment] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState(1000)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      loadGroups()
      loadEvents()
      loadContributions()
    }
  }, [session])

  const loadGroups = async () => {
    try {
      const response = await fetch('/api/groups')
      if (response.ok) {
        const data = await response.json()
        setGroups(data.map((group: any) => ({
          id: group.id,
          name: group.name,
          description: group.description,
          monthlyAmount: group.monthlyAmount || 1000,
          memberCount: group._count?.members || 0,
          createdAt: group.createdAt
        })))
      }
    } catch (error) {
      console.error('Failed to load groups:', error)
    }
  }

  const loadEvents = async () => {
    try {
      const response = await fetch('/api/events')
      if (response.ok) {
        const data = await response.json()
        setEvents(data.map((event: any) => ({
          id: event.id,
          title: event.title,
          description: event.description,
          date: event.date,
          location: event.location,
          theme: event.theme,
          groupId: event.groupId,
          groupName: event.group?.name || 'Unknown',
          attendeeCount: event._count?.attendees || 0
        })))
      }
    } catch (error) {
      console.error('Failed to load events:', error)
    }
  }

  const loadContributions = async () => {
    try {
      const response = await fetch('/api/contributions')
      if (response.ok) {
        const data = await response.json()
        setContributions(data.map((contrib: any) => ({
          id: contrib.id,
          amount: contrib.amount,
          month: contrib.month,
          status: contrib.status,
          groupName: contrib.group?.name || 'Unknown',
          paidAt: contrib.paidAt
        })))
      }
    } catch (error) {
      console.error('Failed to load contributions:', error)
    }
  }

  const createGroup = async () => {
    try {
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newGroup,
          hostId: session?.user?.id
        })
      })
      
      if (response.ok) {
        setShowCreateGroup(false)
        setNewGroup({ name: '', description: '', monthlyAmount: 1000 })
        loadGroups()
      }
    } catch (error) {
      console.error('Failed to create group:', error)
    }
  }

  const createEvent = async () => {
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newEvent,
          hostId: session?.user?.id
        })
      })
      
      if (response.ok) {
        setShowCreateEvent(false)
        setNewEvent({ title: '', description: '', date: '', location: '', theme: '', groupId: '' })
        loadEvents()
      }
    } catch (error) {
      console.error('Failed to create event:', error)
    }
  }

  const makePayment = async () => {
    try {
      const response = await fetch('/api/contributions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: paymentAmount,
          month: new Date().toISOString().slice(0, 7),
          userId: session?.user?.id,
          groupId: groups[0]?.id,
          paymentMethod: 'cash'
        })
      })
      
      if (response.ok) {
        setShowPayment(false)
        loadContributions()
      }
    } catch (error) {
      console.error('Failed to make payment:', error)
    }
  }

  const handleGameComplete = (score: number) => {
    alert(`🎉 Game completed! You scored ${score} points!`)
    setSelectedGame(null)
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

  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!session) {
    return null
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
              {selectedGame === 'tambola' ? 'Tambola' : 'Spin Wheel'}
            </h1>
            <div className="w-20"></div>
          </div>
          {renderGame()}
        </div>
      </div>
    )
  }

  const totalSaved = contributions.filter(c => c.status === 'paid').reduce((sum, c) => sum + c.amount, 0)
  const pendingPayments = contributions.filter(c => c.status === 'pending').reduce((sum, c) => sum + c.amount, 0)

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
              <h1 className="text-xl font-bold text-gray-900">KittyParty</h1>
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
                <AvatarImage src="" />
                <AvatarFallback>{session.user?.name?.[0] || 'U'}</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" onClick={() => signOut()}>
                <LogOut className="w-4 h-4" />
              </Button>
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
                  <div className="text-3xl font-bold">{groups.length}</div>
                  <p className="text-pink-100 text-sm">Active kitty groups</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Total Saved</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₹{totalSaved}</div>
                  <p className="text-blue-100 text-sm">Across all groups</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Pending</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₹{pendingPayments}</div>
                  <p className="text-green-100 text-sm">Pending payments</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Groups</CardTitle>
                  <CardDescription>Your active kitty party groups</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {groups.slice(0, 3).map(group => (
                    <div key={group.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{group.name}</h4>
                        <p className="text-sm text-gray-600">{group.memberCount} members • ₹{group.monthlyAmount}/month</p>
                      </div>
                      <Badge variant="outline" className="text-xs">Active</Badge>
                    </div>
                  ))}
                  <Button className="w-full" variant="outline" onClick={() => setActiveTab('groups')}>
                    View All Groups
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Don't miss the next party!</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {events.slice(0, 3).map(event => (
                    <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-gray-600">{event.groupName} • {event.attendeeCount} attending</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">Upcoming</Badge>
                    </div>
                  ))}
                  <Button className="w-full" variant="outline" onClick={() => setActiveTab('events')}>
                    View All Events
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Groups Tab */}
          <TabsContent value="groups" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Groups</h2>
              <Dialog open={showCreateGroup} onOpenChange={setShowCreateGroup}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Group
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Group</DialogTitle>
                    <DialogDescription>
                      Start a new kitty party group and invite members
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="group-name">Group Name</Label>
                      <Input
                        id="group-name"
                        value={newGroup.name}
                        onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                        placeholder="Enter group name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="group-description">Description</Label>
                      <Textarea
                        id="group-description"
                        value={newGroup.description}
                        onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                        placeholder="Describe your group"
                      />
                    </div>
                    <div>
                      <Label htmlFor="monthly-amount">Monthly Amount (₹)</Label>
                      <Input
                        id="monthly-amount"
                        type="number"
                        value={newGroup.monthlyAmount}
                        onChange={(e) => setNewGroup({ ...newGroup, monthlyAmount: parseInt(e.target.value) })}
                      />
                    </div>
                    <Button onClick={createGroup} className="w-full">
                      Create Group
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map(group => (
                <Card key={group.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <Badge>Active</Badge>
                    </div>
                    <CardDescription>{group.memberCount} members</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="w-4 h-4 mr-2" />
                        ₹{group.monthlyAmount} per month
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        {group.memberCount} active members
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
              <Button onClick={() => setShowPayment(true)}>
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
                    {contributions.map(contrib => (
                      <div key={contrib.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{contrib.month}</h4>
                          <p className="text-sm text-gray-600">{contrib.groupName}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{contrib.amount}</p>
                          <Badge variant={contrib.status === 'paid' ? "default" : "secondary"}>
                            {contrib.status}
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
                    <span className="font-medium">₹{totalSaved}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending</span>
                    <span className="font-medium text-orange-600">₹{pendingPayments}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Net Balance</span>
                    <span className="text-green-600">₹{totalSaved}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Dialog open={showPayment} onOpenChange={setShowPayment}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Make Payment</DialogTitle>
                  <DialogDescription>
                    Record your monthly contribution
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="payment-amount">Amount (₹)</Label>
                    <Input
                      id="payment-amount"
                      type="number"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label>Payment Method</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="upi">UPI</SelectItem>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={makePayment} className="w-full">
                    Make Payment
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Events & Parties</h2>
              <Dialog open={showCreateEvent} onOpenChange={setShowCreateEvent}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Event</DialogTitle>
                    <DialogDescription>
                      Plan your next kitty party
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="event-title">Event Title</Label>
                      <Input
                        id="event-title"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        placeholder="Enter event title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="event-description">Description</Label>
                      <Textarea
                        id="event-description"
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                        placeholder="Describe your event"
                      />
                    </div>
                    <div>
                      <Label htmlFor="event-date">Date</Label>
                      <Input
                        id="event-date"
                        type="datetime-local"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="event-location">Location</Label>
                      <Input
                        id="event-location"
                        value={newEvent.location}
                        onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                        placeholder="Event location"
                      />
                    </div>
                    <div>
                      <Label htmlFor="event-theme">Theme</Label>
                      <Input
                        id="event-theme"
                        value={newEvent.theme}
                        onChange={(e) => setNewEvent({ ...newEvent, theme: e.target.value })}
                        placeholder="Party theme"
                      />
                    </div>
                    <div>
                      <Label>Select Group</Label>
                      <Select value={newEvent.groupId} onValueChange={(value) => setNewEvent({ ...newEvent, groupId: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a group" />
                        </SelectTrigger>
                        <SelectContent>
                          {groups.map(group => (
                            <SelectItem key={group.id} value={group.id}>
                              {group.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={createEvent} className="w-full">
                      Create Event
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map(event => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <Badge variant="outline">Upcoming</Badge>
                    </div>
                    <CardDescription>{event.groupName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      {event.location && (
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          {event.location}
                        </div>
                      )}
                      {event.theme && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Sparkles className="w-4 h-4 mr-2" />
                          {event.theme}
                        </div>
                      )}
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        {event.attendeeCount} people attending
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
              {[
                { id: 1, name: 'Tambola', icon: '🎫', players: '2-20', duration: '30-45 min', component: 'tambola' },
                { id: 2, name: 'Spin the Wheel', icon: '🎯', players: '1-10', duration: '5-10 min', component: 'spin-wheel' },
                { id: 3, name: 'Musical Chairs', icon: '🪑', players: '5-15', duration: '10-15 min', component: null },
                { id: 4, name: 'Antakshari', icon: '🎵', players: '4-20', duration: '20-30 min', component: null },
              ].map(game => (
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
                  {[
                    { id: 1, name: 'Snack Party Pack', price: 299, items: 'Samosa, Pakoda, Chips' },
                    { id: 2, name: 'Full Catering Package', price: 999, items: 'Starters, Main Course, Desserts' },
                    { id: 3, name: 'Dessert Bundle', price: 199, items: 'Gulab Jamun, Rasgulla, Ice Cream' },
                  ].map(service => (
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}