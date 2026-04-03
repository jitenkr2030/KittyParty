'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Shuffle, Play, Pause, RotateCcw, Trophy } from 'lucide-react'

interface TambolaGameProps {
  onGameComplete?: (score: number) => void
}

export default function TambolaGame({ onGameComplete }: TambolaGameProps) {
  const generateInitialNumbers = () => {
    const nums = Array.from({ length: 90 }, (_, i) => i + 1)
    return nums.sort(() => Math.random() - 0.5)
  }

  const generateInitialTicket = () => {
    const ticket: number[][] = []
    const usedNumbers = new Set<number>()
    
    for (let row = 0; row < 3; row++) {
      const ticketRow: number[] = []
      for (let col = 0; col < 9; col++) {
        if (Math.random() > 0.4) { // 60% chance of having a number
          let num: number
          do {
            num = col * 10 + Math.floor(Math.random() * 10) + 1
            if (col === 8) num = Math.min(num, 90)
          } while (usedNumbers.has(num))
          
          usedNumbers.add(num)
          ticketRow.push(num)
        } else {
          ticketRow.push(0) // 0 represents blank space
        }
      }
      ticket.push(ticketRow)
    }
    
    return ticket
  }

  const [numbers, setNumbers] = useState<number[]>(generateInitialNumbers)
  const [calledNumbers, setCalledNumbers] = useState<number[]>([])
  const [currentNumber, setCurrentNumber] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playerTicket, setPlayerTicket] = useState<number[][]>(generateInitialTicket)
  const [markedNumbers, setMarkedNumbers] = useState<Set<number>>(new Set())

  const generateNumbers = useCallback(() => {
    const nums = Array.from({ length: 90 }, (_, i) => i + 1)
    setNumbers(nums.sort(() => Math.random() - 0.5))
  }, [])

  const generateTicket = useCallback(() => {
    const ticket: number[][] = []
    const usedNumbers = new Set<number>()
    
    for (let row = 0; row < 3; row++) {
      const ticketRow: number[] = []
      for (let col = 0; col < 9; col++) {
        if (Math.random() > 0.4) { // 60% chance of having a number
          let num: number
          do {
            num = col * 10 + Math.floor(Math.random() * 10) + 1
            if (col === 8) num = Math.min(num, 90)
          } while (usedNumbers.has(num))
          
          usedNumbers.add(num)
          ticketRow.push(num)
        } else {
          ticketRow.push(0) // 0 represents blank space
        }
      }
      ticket.push(ticketRow)
    }
    
    setPlayerTicket(ticket)
  }, [])

  const callNumber = () => {
    if (numbers.length === 0) return
    
    const remainingNumbers = numbers.filter(n => !calledNumbers.includes(n))
    if (remainingNumbers.length === 0) return
    
    const nextNumber = remainingNumbers[Math.floor(Math.random() * remainingNumbers.length)]
    setCurrentNumber(nextNumber)
    setCalledNumbers([...calledNumbers, nextNumber])
  }

  const toggleMark = (num: number) => {
    const newMarked = new Set(markedNumbers)
    if (newMarked.has(num)) {
      newMarked.delete(num)
    } else {
      newMarked.add(num)
    }
    setMarkedNumbers(newMarked)
    
    // Check for win conditions
    checkWinCondition(newMarked)
  }

  const checkWinCondition = (marked: Set<number>) => {
    // Simple win condition: mark all numbers in any row
    for (const row of playerTicket) {
      const rowNumbers = row.filter(n => n !== 0)
      if (rowNumbers.every(n => marked.has(n))) {
        handleWin('Row Complete!')
        return
      }
    }
    
    // Check for full house
    const allTicketNumbers = playerTicket.flat().filter(n => n !== 0)
    if (allTicketNumbers.every(n => marked.has(n))) {
      handleWin('Full House!')
    }
  }

  const handleWin = (message: string) => {
    setIsPlaying(false)
    const score = message === 'Full House!' ? 100 : 50
    onGameComplete?.(score)
    alert(`🎉 ${message} You scored ${score} points!`)
  }

  const resetGame = () => {
    setCalledNumbers([])
    setCurrentNumber(null)
    setIsPlaying(false)
    setMarkedNumbers(new Set())
    generateTicket()
    generateNumbers()
  }

  const startAutoPlay = () => {
    setIsPlaying(true)
  }

  const stopAutoPlay = () => {
    setIsPlaying(false)
  }

  // Auto-call numbers when playing
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        callNumber()
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isPlaying, calledNumbers, numbers])

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>🎫 Tambola / Housie</span>
            <Badge variant={isPlaying ? "default" : "secondary"}>
              {isPlaying ? "Playing" : "Paused"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Game Controls */}
            <div className="space-y-4">
              <div className="text-center">
                {currentNumber && (
                  <div className="text-6xl font-bold text-pink-600 mb-4">
                    {currentNumber}
                  </div>
                )}
                <p className="text-gray-600">
                  {calledNumbers.length} numbers called
                </p>
              </div>

              <div className="flex space-x-2">
                {!isPlaying ? (
                  <Button onClick={startAutoPlay} className="flex-1">
                    <Play className="w-4 h-4 mr-2" />
                    Start Auto Play
                  </Button>
                ) : (
                  <Button onClick={stopAutoPlay} variant="outline" className="flex-1">
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </Button>
                )}
                
                <Button onClick={callNumber} variant="outline">
                  <Shuffle className="w-4 h-4" />
                </Button>
                
                <Button onClick={resetGame} variant="outline">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>

              <Separator />

              {/* Called Numbers */}
              <div>
                <h3 className="font-medium mb-2">Called Numbers</h3>
                <div className="grid grid-cols-10 gap-1 max-h-48 overflow-y-auto">
                  {Array.from({ length: 90 }, (_, i) => i + 1).map(num => (
                    <div
                      key={num}
                      className={`w-8 h-8 flex items-center justify-center text-xs rounded ${
                        calledNumbers.includes(num)
                          ? 'bg-pink-500 text-white'
                          : 'bg-gray-100'
                      }`}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Player Ticket */}
            <div>
              <h3 className="font-medium mb-2">Your Ticket</h3>
              <div className="bg-white border rounded-lg p-4">
                <div className="grid grid-cols-9 gap-1">
                  {playerTicket.map((row, rowIndex) =>
                    row.map((num, colIndex) => (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`aspect-square flex items-center justify-center text-sm font-medium rounded cursor-pointer border ${
                          num === 0
                            ? 'bg-gray-50'
                            : markedNumbers.has(num)
                            ? 'bg-green-500 text-white'
                            : 'bg-white hover:bg-gray-50'
                        }`}
                        onClick={() => num !== 0 && toggleMark(num)}
                      >
                        {num !== 0 ? num : ''}
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>How to play:</strong> Click numbers on your ticket when they're called. 
                  Complete a row or full house to win!
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}