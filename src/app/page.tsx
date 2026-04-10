'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Calendar, 
  DollarSign, 
  Gift, 
  MessageCircle, 
  Gamepad2, 
  Trophy,
  Sparkles,
  PartyPopper,
  Star,
  Clock,
  MapPin,
  ChefHat,
  ShoppingBag,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const features = [
    {
      icon: Users,
      title: "Group Management",
      description: "Create and manage kitty groups with members, roles, and permissions"
    },
    {
      icon: DollarSign,
      title: "Money Tracking",
      description: "Digital ledger for contributions, payments, and financial management"
    },
    {
      icon: Calendar,
      title: "Event Planning",
      description: "Organize parties, send invitations, and track RSVPs"
    },
    {
      icon: Gamepad2,
      title: "Interactive Games",
      description: "Play Tambola, Spin Wheel, and other party games online"
    },
    {
      icon: ChefHat,
      title: "Food & Services",
      description: "Order food packages and book party decorations"
    },
    {
      icon: MessageCircle,
      title: "Group Chat",
      description: "Real-time messaging with group members"
    }
  ]

  const handleLogin = async (email: string, password: string) => {
    if (!email || !password) {
      alert('Please enter both email and password')
      return
    }
    
    setIsLoading(true)
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })
      
      if (result?.error) {
        alert('Invalid credentials. Please try again.')
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (name: string, email: string, password: string) => {
    if (!name || !email || !password) {
      alert('Please fill in all fields')
      return
    }
    
    setIsLoading(true)
    try {
      // For signup, we'll use the same credentials provider which creates a user if it doesn't exist
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })
      
      if (result?.error) {
        alert('Signup failed. Please try again.')
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Signup error:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
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
            
            <Button onClick={() => document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4" variant="secondary">
            <Sparkles className="w-4 h-4 mr-1" />
            All-in-One Kitty Party Platform
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Manage, Plan & Enjoy
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
              Kitty Parties
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The complete platform for kitty party management. From group creation and money tracking 
            to event planning and food ordering - everything you need in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-lg px-8 py-3"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-lg px-8 py-3"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need for Amazing Kitty Parties
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From traditional kitty party management to modern food ordering and games
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h3>
            <p className="text-xl text-gray-600">
              Get started in 3 simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Sign Up</h4>
              <p className="text-gray-600">Create your free account and set up your profile</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Create Groups</h4>
              <p className="text-gray-600">Set up your kitty groups and invite members</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Start Partying</h4>
              <p className="text-gray-600">Plan events, manage money, and enjoy the party!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Authentication Section */}
      <section id="auth-section" className="py-20 px-4 bg-white">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <PartyPopper className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Welcome to KittyParty</CardTitle>
              <CardDescription>
                Join thousands of women enjoying amazing kitty parties
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input 
                      id="login-email" 
                      type="email" 
                      placeholder="Enter your email"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const password = document.getElementById('login-password') as HTMLInputElement
                          handleLogin((e.target as HTMLInputElement).value, password.value)
                        }
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input 
                      id="login-password" 
                      type="password" 
                      placeholder="Enter your password"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const email = document.getElementById('login-email') as HTMLInputElement
                          handleLogin(email.value, (e.target as HTMLInputElement).value)
                        }
                      }}
                    />
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => {
                      const email = (document.getElementById('login-email') as HTMLInputElement)?.value
                      const password = (document.getElementById('login-password') as HTMLInputElement)?.value
                      handleLogin(email, password)
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </TabsContent>
                
                <TabsContent value="signup" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Name</Label>
                    <Input id="signup-name" type="text" placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input id="signup-password" type="password" placeholder="Create a password" />
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => {
                      const name = (document.getElementById('signup-name') as HTMLInputElement)?.value
                      const email = (document.getElementById('signup-email') as HTMLInputElement)?.value
                      const password = (document.getElementById('signup-password') as HTMLInputElement)?.value
                      handleSignup(name, email, password)
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </TabsContent>
              </Tabs>
              
              <div className="mt-6 text-center text-sm text-gray-600">
                By signing up, you agree to our Terms of Service and Privacy Policy
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
              <PartyPopper className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-bold">KittyParty</h4>
          </div>
          <p className="text-gray-400 mb-4">
            Making kitty parties more organized, fun, and memorable
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <span>© 2024 KittyParty</span>
            <span>•</span>
            <span>Terms</span>
            <span>•</span>
            <span>Privacy</span>
          </div>
        </div>
      </footer>
    </div>
  )
}