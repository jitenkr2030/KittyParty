'use client'

import { useState, useEffect } from 'react'
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
  Send,
  Mic,
  LogOut,
  Eye,
  Edit,
  Trash2
} from 'lucide-react'
import TambolaGame from '@/components/games/tambola'
import SpinWheel from '@/components/games/spin-wheel'

interface Group {
  id: string
  name: string
  description: string
  members: number
  maxMembers?: number
  monthlyAmount: number
  nextMeeting: string
  isActive: boolean
  role: 'admin' | 'member'
}

interface Event {
  id: string
  title: string
  description: string
  date: string
  location: string
  theme: string
  budget: number
  groupId: string
  groupName: string
  attendees: number
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
}

interface Contribution {
  id: string
  amount: number
  month: string
  status: 'pending' | 'paid' | 'overdue'
  groupName: string
  groupId: string
  paymentMethod?: string
}

export default function Dashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [user, setUser] = useState<{ name: string; email: string; id: string } | null>(null)
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [showCreateEvent, setShowCreateEvent] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  
  // State for groups
  const [groups, setGroups] = useState<Group[]>([
    { id: '1', name: 'Mumbai Queens', description: 'Monthly kitty party group', members: 8, maxMembers: 10, monthlyAmount: 1000, nextMeeting: '2024-02-15', isActive: true, role: 'admin' },
    { id: '2', name: 'Ladies Circle', description: 'Weekend gathering group', members: 6, maxMembers: 8, monthlyAmount: 500, nextMeeting: '2024-02-20', isActive: true, role: 'member' },
  ])

  // State for events
  const [events, setEvents] = useState<Event[]>([
    { id: '1', title: 'Bollywood Theme Party', description: 'Dress up as your favorite Bollywood character', date: '2024-02-15', location: 'Andheri, Mumbai', theme: 'Bollywood', budget: 5000, groupId: '1', groupName: 'Mumbai Queens', attendees: 7, status: 'upcoming' },
    { id: '2', title: 'Diwali Celebration', description: 'Festival of lights celebration', date: '2024-02-20', location: 'Bandra, Mumbai', theme: 'Diwali', budget: 3000, groupId: '2', groupName: 'Ladies Circle', attendees: 5, status: 'upcoming' },
  ])

  // State for contributions
  const [contributions, setContributions] = useState<Contribution[]>([
    { id: '1', amount: 1000, month: '2024-01', status: 'paid', groupName: 'Mumbai Queens', groupId: '1', paymentMethod: 'UPI' },
    { id: '2', amount: 500, month: '2024-01', status: 'paid', groupName: 'Ladies Circle', groupId: '2', paymentMethod: 'Cash' },
    { id: '3', amount: 1000, month: '2024-02', status: 'pending', groupName: 'Mumbai Queens', groupId: '1' },
    { id: '4', amount: 500, month: '2024-02', status: 'pending', groupName: 'Ladies Circle', groupId: '2' },
  ])

  const [newGroup, setNewGroup] = useState({ name: '', description: '', maxMembers: '', monthlyAmount: '' })
  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', location: '', theme: '', budget: '', groupId: '' })
  const [newPayment, setNewPayment] = useState({ amount: '', method: '', groupId: '' })

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      const userData = localStorage.getItem('user')
      if (!userData) {
        router.push('/')
        return
      }
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error('Error parsing user data:', error)
        router.push('/')
      }
    }
    
    checkAuth()
  }, [router])

  // Show loading state while checking authentication
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <PartyPopper className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

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

  const handleCreateGroup = async () => {
    if (newGroup.name && newGroup.monthlyAmount) {
      try {
        const response = await fetch('/api/groups', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: newGroup.name,
            description: newGroup.description,
            maxMembers: newGroup.maxMembers ? parseInt(newGroup.maxMembers) : null,
            monthlyAmount: parseFloat(newGroup.monthlyAmount),
            hostId: user.id // Use actual user ID
          })
        })

        if (response.ok) {
          const createdGroup = await response.json()
          const groupWithRole = {
            ...createdGroup,
            members: 1,
            role: 'admin' as const,
            nextMeeting: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            isActive: true
          }
          setGroups([...groups, groupWithRole])
          setNewGroup({ name: '', description: '', maxMembers: '', monthlyAmount: '' })
          setShowCreateGroup(false)
          alert('Group created successfully!')
        } else {
          const error = await response.json()
          alert(error.error || 'Failed to create group')
        }
      } catch (error) {
        console.error('Create group error:', error)
        alert('Failed to create group. Please try again.')
      }
    }
  }

  const handleCreateEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.groupId) {
      const group = groups.find(g => g.id === newEvent.groupId)
      const event: Event = {
        id: Date.now().toString(),
        title: newEvent.title,
        description: newEvent.description,
        date: newEvent.date,
        location: newEvent.location,
        theme: newEvent.theme,
        budget: parseFloat(newEvent.budget) || 0,
        groupId: newEvent.groupId,
        groupName: group?.name || '',
        attendees: 1,
        status: 'upcoming'
      }
      setEvents([...events, event])
      setNewEvent({ title: '', description: '', date: '', location: '', theme: '', budget: '', groupId: '' })
      setShowCreateEvent(false)
    }
  }

  const handleMakePayment = () => {
    if (newPayment.amount && newPayment.method && newPayment.groupId) {
      const group = groups.find(g => g.id === newPayment.groupId)
      const contribution: Contribution = {
        id: Date.now().toString(),
        amount: parseFloat(newPayment.amount),
        month: new Date().toISOString().slice(0, 7),
        status: 'paid',
        groupName: group?.name || '',
        groupId: newPayment.groupId,
        paymentMethod: newPayment.method
      }
      setContributions([...contributions, contribution])
      setNewPayment({ amount: '', method: '', groupId: '' })
      setShowPayment(false)
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

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
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
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
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
                  <CardTitle className="text-lg">Total Contributed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₹{contributions.filter(c => c.status === 'paid').reduce((sum, c) => sum + c.amount, 0)}</div>
                  <p className="text-blue-100 text-sm">Across all groups</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{events.filter(e => e.status === 'upcoming').length}</div>
                  <p className="text-green-100 text-sm">Events to attend</p>
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
                  {groups.map(group => (
                    <div key={group.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{group.name}</h4>
                        <p className="text-sm text-gray-600">{group.members} members • ₹{group.monthlyAmount}/month</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Next: {group.nextMeeting}</p>
                        <Badge variant={group.role === 'admin' ? "default" : "secondary"} className="text-xs">
                          {group.role}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Don't miss the next party!</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {events.filter(e => e.status === 'upcoming').map(event => (
                    <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-gray-600">{event.groupName} • {event.attendees} attending</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{event.date}</p>
                        <Badge variant="secondary" className="text-xs">Upcoming</Badge>
                      </div>
                    </div>
                  ))}
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
                    <DialogDescription>Start a new kitty party group</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="group-name">Group Name</Label>
                      <Input
                        id="group-name"
                        value={newGroup.name}
                        onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                        placeholder="Enter group name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="group-description">Description</Label>
                      <Textarea
                        id="group-description"
                        value={newGroup.description}
                        onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
                        placeholder="Describe your group"
                      />
                    </div>
                    <div>
                      <Label htmlFor="max-members">Max Members (Optional)</Label>
                      <Input
                        id="max-members"
                        type="number"
                        value={newGroup.maxMembers}
                        onChange={(e) => setNewGroup({...newGroup, maxMembers: e.target.value})}
                        placeholder="Maximum number of members"
                      />
                    </div>
                    <div>
                      <Label htmlFor="monthly-amount">Monthly Amount (₹)</Label>
                      <Input
                        id="monthly-amount"
                        type="number"
                        value={newGroup.monthlyAmount}
                        onChange={(e) => setNewGroup({...newGroup, monthlyAmount: e.target.value})}
                        placeholder="Monthly contribution amount"
                      />
                    </div>
                    <Button onClick={handleCreateGroup} className="w-full">Create Group</Button>
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
                      <Badge>{group.role}</Badge>
                    </div>
                    <CardDescription>{group.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="w-4 h-4 mr-2" />
                        ₹{group.monthlyAmount} per month
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        Next: {group.nextMeeting}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        {group.members}{group.maxMembers ? `/${group.maxMembers}` : ''} members
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      {group.role === 'admin' && (
                        <Button size="sm" className="flex-1">
                          <Edit className="w-4 h-4 mr-1" />
                          Manage
                        </Button>
                      )}
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
              <Dialog open={showPayment} onOpenChange={setShowPayment}>
                <DialogTrigger asChild>
                  <Button>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Make Payment
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Make Payment</DialogTitle>
                    <DialogDescription>Record your contribution payment</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="payment-group">Select Group</Label>
                      <Select value={newPayment.groupId} onValueChange={(value) => setNewPayment({...newPayment, groupId: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a group" />
                        </SelectTrigger>
                        <SelectContent>
                          {groups.map(group => (
                            <SelectItem key={group.id} value={group.id}>{group.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="payment-amount">Amount (₹)</Label>
                      <Input
                        id="payment-amount"
                        type="number"
                        value={newPayment.amount}
                        onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
                        placeholder="Enter amount"
                      />
                    </div>
                    <div>
                      <Label htmlFor="payment-method">Payment Method</Label>
                      <Select value={newPayment.method} onValueChange={(value) => setNewPayment({...newPayment, method: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="upi">UPI</SelectItem>
                          <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleMakePayment} className="w-full">Record Payment</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Contribution Ledger</CardTitle>
                  <CardDescription>Track all your monthly contributions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {contributions.map(contribution => (
                      <div key={contribution.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{contribution.month}</h4>
                          <p className="text-sm text-gray-600">{contribution.groupName}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{contribution.amount}</p>
                          <Badge variant={contribution.status === 'paid' ? "default" : "secondary"}>
                            {contribution.status}
                          </Badge>
                          {contribution.paymentMethod && (
                            <p className="text-xs text-gray-500">{contribution.paymentMethod}</p>
                          )}
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
                    <span className="font-medium">₹{contributions.filter(c => c.status === 'paid').reduce((sum, c) => sum + c.amount, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending</span>
                    <span className="font-medium text-orange-600">₹{contributions.filter(c => c.status === 'pending').reduce((sum, c) => sum + c.amount, 0)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total Groups</span>
                    <span>{groups.length}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
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
                    <DialogDescription>Organize a party or gathering</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="event-title">Event Title</Label>
                      <Input
                        id="event-title"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                        placeholder="Enter event title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="event-group">Select Group</Label>
                      <Select value={newEvent.groupId} onValueChange={(value) => setNewEvent({...newEvent, groupId: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a group" />
                        </SelectTrigger>
                        <SelectContent>
                          {groups.map(group => (
                            <SelectItem key={group.id} value={group.id}>{group.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="event-description">Description</Label>
                      <Textarea
                        id="event-description"
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                        placeholder="Describe your event"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="event-date">Date</Label>
                        <Input
                          id="event-date"
                          type="date"
                          value={newEvent.date}
                          onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="event-budget">Budget (₹)</Label>
                        <Input
                          id="event-budget"
                          type="number"
                          value={newEvent.budget}
                          onChange={(e) => setNewEvent({...newEvent, budget: e.target.value})}
                          placeholder="Event budget"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="event-location">Location</Label>
                      <Input
                        id="event-location"
                        value={newEvent.location}
                        onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                        placeholder="Event location"
                      />
                    </div>
                    <div>
                      <Label htmlFor="event-theme">Theme</Label>
                      <Input
                        id="event-theme"
                        value={newEvent.theme}
                        onChange={(e) => setNewEvent({...newEvent, theme: e.target.value})}
                        placeholder="Event theme"
                      />
                    </div>
                    <Button onClick={handleCreateEvent} className="w-full">Create Event</Button>
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
                      <Badge variant="outline">{event.status}</Badge>
                    </div>
                    <CardDescription>{event.groupName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        {event.attendees} people attending
                      </div>
                      {event.theme && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Sparkles className="w-4 h-4 mr-2" />
                          Theme: {event.theme}
                        </div>
                      )}
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}