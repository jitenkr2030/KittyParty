'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RotateCcw, Trophy } from 'lucide-react'

interface SpinWheelProps {
  onGameComplete?: (score: number) => void
}

export default function SpinWheel({ onGameComplete }: SpinWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [selectedPrize, setSelectedPrize] = useState<string | null>(null)
  const [score, setScore] = useState(0)

  const prizes = [
    { name: '🎁 Gift Box', points: 10, color: 'bg-red-400' },
    { name: '💎 Diamond', points: 50, color: 'bg-blue-400' },
    { name: '🌟 Star', points: 20, color: 'bg-yellow-400' },
    { name: '🎯 Bullseye', points: 30, color: 'bg-green-400' },
    { name: '🏆 Trophy', points: 40, color: 'bg-purple-400' },
    { name: '💰 Money Bag', points: 25, color: 'bg-orange-400' },
    { name: '🎈 Balloon', points: 15, color: 'bg-pink-400' },
    { name: '🍀 Lucky', points: 35, color: 'bg-teal-400' },
  ]

  const spinWheel = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setSelectedPrize(null)

    // Calculate random spin (3-5 full rotations plus random position)
    const spins = Math.floor(Math.random() * 3) + 3
    const finalPosition = Math.floor(Math.random() * 360)
    const totalRotation = rotation + (spins * 360) + finalPosition

    setRotation(totalRotation)

    // Determine prize based on final position
    setTimeout(() => {
      const normalizedPosition = finalPosition % 360
      const prizeIndex = Math.floor(normalizedPosition / (360 / prizes.length))
      const prize = prizes[prizeIndex]
      
      setSelectedPrize(prize.name)
      setScore(score + prize.points)
      setIsSpinning(false)
      
      onGameComplete?.(prize.points)
    }, 3000)
  }

  const resetGame = () => {
    setRotation(0)
    setSelectedPrize(null)
    setScore(0)
    setIsSpinning(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>🎯 Spin the Wheel</span>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">Score: {score}</Badge>
              {isSpinning && <Badge variant="default">Spinning...</Badge>}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Wheel */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-80 h-80">
                {/* Wheel Container */}
                <div 
                  className="absolute inset-0 rounded-full overflow-hidden shadow-lg transition-transform duration-3000 ease-out"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  {prizes.map((prize, index) => {
                    const angle = (360 / prizes.length) * index
                    const nextAngle = (360 / prizes.length) * (index + 1)
                    
                    return (
                      <div
                        key={index}
                        className={`absolute inset-0 ${prize.color}`}
                        style={{
                          clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((angle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((angle - 90) * Math.PI / 180)}%, ${50 + 50 * Math.cos((nextAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((nextAngle - 90) * Math.PI / 180)}%)`
                        }}
                      >
                        <div 
                          className="absolute text-white font-bold text-sm"
                          style={{
                            top: '30%',
                            left: '50%',
                            transform: `translate(-50%, -50%) rotate(${angle + (360 / prizes.length) / 2}deg)`,
                            transformOrigin: 'center'
                          }}
                        >
                          {prize.name}
                        </div>
                      </div>
                    )
                  })}
                </div>
                
                {/* Pointer */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                  <div className="w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-red-600"></div>
                </div>
                
                {/* Center circle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button 
                  onClick={spinWheel} 
                  disabled={isSpinning}
                  className="flex-1"
                >
                  {isSpinning ? 'Spinning...' : 'Spin Wheel'}
                </Button>
                <Button onClick={resetGame} variant="outline">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Results and Info */}
            <div className="space-y-4">
              {selectedPrize && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-bold text-green-800 flex items-center">
                    <Trophy className="w-5 h-5 mr-2" />
                    Congratulations!
                  </h3>
                  <p className="text-green-700">You won: {selectedPrize}</p>
                </div>
              )}

              <div>
                <h3 className="font-medium mb-2">Prizes</h3>
                <div className="space-y-2">
                  {prizes.map((prize, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center space-x-2">
                        <div className={`w-4 h-4 rounded ${prize.color}`}></div>
                        <span className="text-sm">{prize.name}</span>
                      </div>
                      <Badge variant="outline">{prize.points} pts</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>How to play:</strong> Click "Spin Wheel" to try your luck! 
                  Each prize has different points. Try to get the highest score!
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}