
'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { DollarSign, Package, ShoppingCart } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'


// Types
interface Product {
  id: string
  name: string
  price: number
  imageUrl: string
  totalSold: number
  revenue: number
}

interface Sale {
  id: string
  buyerName: string
  productName: string
  quantity: number
  totalPaid: number
  date: Date
}

interface SalesData {
  name: string
  sales: number
}

export default function AdminDashboard() {
  const [userName, setUserName] = useState('Mtf') ; // from db
  const [activeTab, setActiveTab] = useState('week')
  const [topSellingProduct, setTopSellingProduct] = useState<Product | null>(null) // from db (le produits qui est le plus vendue (par rapport au contite))
  const [topRevenueProduct, setTopRevenueProduct] = useState<Product | null>(null) // from db (le produit qui a generer le plus de revenue)
  const [recentSales, setRecentSales] = useState<Sale[]>([]) // from db (les 5 dernieres ventes)
  const [salesData, setSalesData] = useState<SalesData[]>([]) 
  
  // Fetch dashboard data
  useEffect(() => {
    // fetch this from your API
    fetchDashboardData(activeTab)
    
  }, [activeTab])
  
   // Wayi atchangit s api call ,en effet vous etes besoin des sales (vents) de jours par heur 00 -->4 , 4-->8 , 8 --> 12 , 12 --> 16 , 14--> 20 
  // pour chaque jours 
  // pour chaque semain de moins current
  // pandant l'anne derniere ... 
  const fetchDashboardData = async (period: string) => {
   
      let data: SalesData[] = []
      
      switch(period) {
        case 'day':
          data = [
            { name: '12AM', sales: 5 },
            { name: '4AM', sales: 2 },
            { name: '8AM', sales: 8 },
            { name: '12PM', sales: 15 },
            { name: '4PM', sales: 25 },
            { name: '8PM', sales: 18 },
          ]
          break;
        case 'week':
          data = [
            { name: 'Mon', sales: 45 },
            { name: 'Tue', sales: 52 },
            { name: 'Wed', sales: 49 },
            { name: 'Thu', sales: 62 },
            { name: 'Fri', sales: 78 },
            { name: 'Sat', sales: 85 },
            { name: 'Sun', sales: 70 },
          ]
          break;
        case 'month':
          data = [
            { name: 'Week 1', sales: 320 },
            { name: 'Week 2', sales: 280 },
            { name: 'Week 3', sales: 310 },
            { name: 'Week 4', sales: 350 },
          ]
          break;
        case 'year':
          data = [
            { name: 'Jan', sales: 1200 },
            { name: 'Feb', sales: 1100 },
            { name: 'Mar', sales: 1300 },
            { name: 'Apr', sales: 1400 },
            { name: 'May', sales: 1500 },
            { name: 'Jun', sales: 1700 },
            { name: 'Jul', sales: 1600 },
            { name: 'Aug', sales: 1400 },
            { name: 'Sep', sales: 1300 },
            { name: 'Oct', sales: 1200 },
            { name: 'Nov', sales: 1500 },
            { name: 'Dec', sales: 1800 },
          ]
          break;
      }
      
      setSalesData(data)
      
      // Remplacer ca avec une api call 
      setTopSellingProduct({
        id: '1',
        name: 'Premium Headphones',
        price: 199.99,
        imageUrl: '/images/headphones.jpg',
        totalSold: 543,
        revenue: 108594.57
      })
      
      // meme chose
      setTopRevenueProduct({
        id: '2',
        name: 'Gaming Laptop',
        price: 1299.99,
        imageUrl: '/images/laptop.jpg',
        totalSold: 126,
        revenue: 163798.74
      })
      
      // meme chose
      setRecentSales([
        {
          id: 's1',
          buyerName: 'John Doe',
          productName: 'Gaming Laptop',
          quantity: 1,
          totalPaid: 1299.99,
          date: new Date(Date.now() - 1000 * 60 * 30) // 30 mins ago
        },
        {
          id: 's2',
          buyerName: 'Jane Smith',
          productName: 'Premium Headphones',
          quantity: 2,
          totalPaid: 399.98,
          date: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
        },
        {
          id: 's3',
          buyerName: 'Mike Johnson',
          productName: 'Wireless Keyboard',
          quantity: 1,
          totalPaid: 89.99,
          date: new Date(Date.now() - 1000 * 60 * 60 * 5) // 5 hours ago
        },
        {
          id: 's4',
          buyerName: 'Sarah Williams',
          productName: 'Smart Watch',
          quantity: 1,
          totalPaid: 249.99,
          date: new Date(Date.now() - 1000 * 60 * 60 * 8) // 8 hours ago
        },
        {
          id: 's5',
          buyerName: 'David Brown',
          productName: 'Bluetooth Speaker',
          quantity: 2,
          totalPaid: 159.98,
          date: new Date(Date.now() - 1000 * 60 * 60 * 12) // 12 hours ago
        }
      ])
   
  }

  // Function par deepSeek pour formater le temps de vente (maintenu ,X min ago , X hour Ago , la date complete)
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.round(diffMs / 1000);
    const diffMin = Math.round(diffSec / 60);
    const diffHour = Math.round(diffMin / 60);
    
    if (diffMin < 1) {
      return 'maintenu';
    } else if (diffMin < 60) {
      return `${diffMin} min ago`;
    } else if (diffHour < 24) {
      return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
  
  return (
    <div className="container mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Hello, {userName}</h1>
        <p className="text-gray-500">Bienvenue dans l'aperçu de votre tableau de bord</p>
      </header>
      
      <div className="grid gap-6">
        {/* Sales Chart */}
        <Card className='border-blue-700'>
          <CardHeader className="pb-2">
            <CardTitle>Aperçu des ventes</CardTitle>
            <p className="text-sm text-gray-500">Visualisez vos performances de vente par période</p>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="week" value={activeTab} onValueChange={setActiveTab}>
             
                <TabsList>
                  <TabsTrigger value="day">Jour</TabsTrigger>
                  <TabsTrigger value="week">Semaine</TabsTrigger>
                  <TabsTrigger value="month">Moins</TabsTrigger>
                  <TabsTrigger value="year">Annee</TabsTrigger>
                </TabsList>
              
              <TabsContent value="day" className="space-y-4">
                <ChartDisplay data={salesData} />
              </TabsContent>
              
              <TabsContent value="week" className="space-y-4">
                <ChartDisplay data={salesData} />
              </TabsContent>
              
              <TabsContent value="month" className="space-y-4">
                <ChartDisplay data={salesData} />
              </TabsContent>
              
              <TabsContent value="year" className="space-y-4">
                <ChartDisplay data={salesData} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Product Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Most Sold Product Card */}
          <Card className='border-blue-700'>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Produit le plus vendu</CardTitle>
              <Package className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              {topSellingProduct ? (
                <div className="space-y-2">
                  <p className="text-2xl font-bold">{topSellingProduct.name}</p>
                  {/*   tu peux ajouter une image de produit jsp comment vous avoir les photo nii */}
                  <div className="flex items-center">
                    <ShoppingCart className="mr-2 h-4 w-4 text-gray-500" />
                    <p className="text-gray-500">{topSellingProduct.totalSold} unités vendues</p>
                  </div>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </CardContent>
          </Card>
          
          {/* Highest Revenue Product Card */}
          <Card className='border-blue-700'>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Produit à revenus les plus élevés</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              {topRevenueProduct ? (
                <div className="space-y-2">
                  <p className="text-2xl font-bold">{topRevenueProduct.name}</p>
                  <div className="flex items-center">
                    <DollarSign className="mr-2 h-4 w-4 text-gray-500" />
                    <p className="text-gray-500">${topRevenueProduct.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  </div>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Sales */}
        <Card className='border-blue-700'>
          <CardHeader>
            <CardTitle>Ventes récentes</CardTitle>
            <p className="text-sm text-gray-500">Les 5 dernières ventes de votre magasin</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSales.length > 0 ? (
                recentSales.map((sale) => (
                  <div key={sale.id} className="flex items-center">
                    <div className="space-y-1 flex-1">
                      <p className="text-sm font-medium leading-none">{sale.buyerName}</p>
                      <p className="text-sm text-gray-500">
                        {sale.productName} x {sale.quantity}
                      </p>
                    </div>
                    <div className="ml-auto text-right space-y-1">
                      <p className="text-sm font-medium">${sale.totalPaid.toFixed(2)}</p>
                      <p className="text-xs text-gray-500">
                        {formatRelativeTime(sale.date)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>Aucune vente récente ...</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ChartDisplay({ data }: { data: SalesData[] }) {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#2016de"
            strokeWidth={"2px"}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}