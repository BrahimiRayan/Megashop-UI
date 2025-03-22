// app/admin/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts'
import { Separator } from '@/components/ui/separator'
import { formatDistanceToNow } from 'date-fns'
import { DollarSign, Package, ShoppingCart } from 'lucide-react'

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
  const { data: session } = useSession()
  const userName = session?.user?.name || 'Admin'
  
  const [activeTab, setActiveTab] = useState('week')
  const [topSellingProduct, setTopSellingProduct] = useState<Product | null>(null)
  const [topRevenueProduct, setTopRevenueProduct] = useState<Product | null>(null)
  const [recentSales, setRecentSales] = useState<Sale[]>([])
  const [salesData, setSalesData] = useState<SalesData[]>([])
  
  // Fetch dashboard data
  useEffect(() => {
    // In a real app, you'd fetch this from an API
    fetchDashboardData(activeTab)
  }, [activeTab])
  
  const fetchDashboardData = async (period: string) => {
    // This would be replaced with actual API calls in a real application
    
    // Simulate loading data
    setTimeout(() => {
      // Sample sales data based on the selected period
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
      
      // Sample top selling product
      setTopSellingProduct({
        id: '1',
        name: 'Premium Headphones',
        price: 199.99,
        imageUrl: '/images/headphones.jpg',
        totalSold: 543,
        revenue: 108594.57
      })
      
      // Sample top revenue product
      setTopRevenueProduct({
        id: '2',
        name: 'Gaming Laptop',
        price: 1299.99,
        imageUrl: '/images/laptop.jpg',
        totalSold: 126,
        revenue: 163798.74
      })
      
      // Sample recent sales
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
    }, 500)
  }
  
  return (
    <div className="container mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Hi, {userName}</h1>
        <p className="text-muted-foreground">Welcome to your dashboard overview</p>
      </header>
      
      <div className="grid gap-6">
        {/* Sales Chart */}
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>View your sales performance by period</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="week" onValueChange={setActiveTab}>
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="day">Day</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
              </div>
              
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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Most Sold Product</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {topSellingProduct ? (
                <div className="space-y-2">
                  <p className="text-2xl font-bold">{topSellingProduct.name}</p>
                  <div className="flex items-center">
                    <ShoppingCart className="mr-2 h-4 w-4 text-muted-foreground" />
                    <p className="text-muted-foreground">{topSellingProduct.totalSold} units sold</p>
                  </div>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </CardContent>
          </Card>
          
          {/* Highest Revenue Product Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Highest Revenue Product</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {topRevenueProduct ? (
                <div className="space-y-2">
                  <p className="text-2xl font-bold">{topRevenueProduct.name}</p>
                  <div className="flex items-center">
                    <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                    <p className="text-muted-foreground">${topRevenueProduct.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  </div>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Sales */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>Latest 5 sales from your store</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSales.length > 0 ? (
                recentSales.map((sale) => (
                  <div key={sale.id} className="flex items-center">
                    <div className="space-y-1 flex-1">
                      <p className="text-sm font-medium leading-none">{sale.buyerName}</p>
                      <p className="text-sm text-muted-foreground">
                        {sale.productName} x {sale.quantity}
                      </p>
                    </div>
                    <div className="ml-auto text-right space-y-1">
                      <p className="text-sm font-medium">${sale.totalPaid.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(sale.date, { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No recent sales</p>
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
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}