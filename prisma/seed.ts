import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create food services
  const foodServices = [
    {
      name: 'Snack Party Pack',
      description: 'Perfect for small kitty parties',
      type: 'food',
      price: 299,
      duration: '3 hours',
      includes: JSON.stringify(['Samosa', 'Pakoda', 'Chips', 'Dips', 'Soft Drinks'])
    },
    {
      name: 'Full Catering Package',
      description: 'Complete catering for large parties',
      type: 'food',
      price: 999,
      duration: '4 hours',
      includes: JSON.stringify(['Starters', 'Main Course', 'Desserts', 'Drinks', 'Service Staff'])
    },
    {
      name: 'Dessert Bundle',
      description: 'Sweet treats for your celebration',
      type: 'food',
      price: 199,
      duration: '2 hours',
      includes: JSON.stringify(['Gulab Jamun', 'Rasgulla', 'Ice Cream', 'Cake'])
    },
    {
      name: 'Tea Party Package',
      description: 'Elegant tea party setup',
      type: 'food',
      price: 399,
      duration: '2 hours',
      includes: JSON.stringify(['Tea', 'Coffee', 'Sandwiches', 'Cookies', 'Cakes'])
    }
  ]

  // Create decoration services
  const decorationServices = [
    {
      name: 'Bollywood Theme Decor',
      description: 'Glamorous Bollywood style decoration',
      type: 'decoration',
      price: 799,
      duration: 'Full day',
      includes: JSON.stringify(['Backdrop', 'Lighting', 'Props', 'Flowers'])
    },
    {
      name: 'Festival Decoration Kit',
      description: 'Traditional festival themed decoration',
      type: 'decoration',
      price: 599,
      duration: 'Full day',
      includes: JSON.stringify(['Rangoli', 'Lights', 'Flowers', 'Torans'])
    },
    {
      name: 'Balloon & Flower Setup',
      description: 'Colorful balloon and flower arrangements',
      type: 'decoration',
      price: 399,
      duration: '4 hours',
      includes: JSON.stringify(['Balloons', 'Flower Bouquets', 'Centerpieces'])
    },
    {
      name: 'Elegant Dinner Setup',
      description: 'Sophisticated dining decoration',
      type: 'decoration',
      price: 899,
      duration: '5 hours',
      includes: JSON.stringify(['Table Settings', 'Centerpieces', 'Candles', 'Lighting'])
    }
  ]

  // Insert food services
  for (const service of foodServices) {
    await prisma.service.create({
      data: service
    })
  }

  // Insert decoration services
  for (const service of decorationServices) {
    await prisma.service.create({
      data: service
    })
  }

  console.log('Services seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })