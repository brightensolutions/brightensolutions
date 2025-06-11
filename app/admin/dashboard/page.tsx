"use client"

import { useState, useEffect } from "react"
import { Users, ShoppingBag, FileText, MessageSquare, ArrowUp, ArrowDown, DollarSign, Eye, Bell } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
        <h2 className="font-roboto-slab text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
      
      {/* Overview Cards */}
    
      {/* Tabs Section */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
                {!isLoading && (
                  <div className="mt-4 h-[80px] w-full bg-gradient-to-r from-brightenone to-brightentwo opacity-80 rounded-md"></div>
                )}
                {isLoading && (
                  <div className="mt-4 h-[80px] w-full animate-pulse rounded-md bg-gray-200"></div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p>
                {!isLoading && (
                  <div className="mt-4 h-[80px] w-full bg-gradient-to-r from-brightenone to-brightentwo opacity-80 rounded-md"></div>
                )}
                {isLoading && (
                  <div className="mt-4 h-[80px] w-full animate-pulse rounded-md bg-gray-200"></div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">
                  +201 since last hour
                </p>
                {!isLoading && (
                  <div className="mt-4 h-[80px] w-full bg-gradient-to-r from-brightenone to-brightentwo opacity-80 rounded-md"></div>
                )}
                {isLoading && (
                  <div className="mt-4 h-[80px] w-full animate-pulse rounded-md bg-gray-200"></div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                  You made 265 sales this month.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200"></div>
                        <div className="space-y-2">
                          <div className="h-4 w-[200px] animate-pulse rounded bg-gray-200"></div>
                          <div className="h-4 w-[150px] animate-pulse rounded bg-gray-200"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-brightenone/20 p-2">
                        <div className="h-10 w-10 rounded-full bg-brightenone"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Olivia Martin</p>
                        <p className="text-xs text-gray-500">olivia.martin@email.com</p>
                      </div>
                      <div className="font-medium">+$1,999.00</div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-brightenone/20 p-2">
                        <div className="h-10 w-10 rounded-full bg-brightenone"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Jackson Lee</p>
                        <p className="text-xs text-gray-500">jackson.lee@email.com</p>
                      </div>
                      <div className="font-medium">+$39.00</div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-brightenone/20 p-2">
                        <div className="h-10 w-10 rounded-full bg-brightenone"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Isabella Nguyen</p>
                        <p className="text-xs text-gray-500">isabella.nguyen@email.com</p>
                      </div>
                      <div className="font-medium">+$299.00</div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-brightenone/20 p-2">
                        <div className="h-10 w-10 rounded-full bg-brightenone"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">William Kim</p>
                        <p className="text-xs text-gray-500">will@email.com</p>
                      </div>
                      <div className="font-medium">+$99.00</div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-brightenone/20 p-2">
                        <div className="h-10 w-10 rounded-full bg-brightenone"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Sofia Davis</p>
                        <p className="text-xs text-gray-500">sofia.davis@email.com</p>
                      </div>
                      <div className="font-medium">+$39.00</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>
                  You have 12 new notifications.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200"></div>
                        <div className="space-y-2">
                          <div className="h-4 w-[200px] animate-pulse rounded bg-gray-200"></div>
                          <div className="h-4 w-[150px] animate-pulse rounded bg-gray-200"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <span className="mr-2 rounded-full bg-green-500 p-1">
                        <Users className="h-3 w-3 text-white" />
                      </span>
                      <p className="text-sm">New user registered</p>
                      <span className="ml-auto text-xs text-gray-500">5m ago</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2 rounded-full bg-blue-500 p-1">
                        <ShoppingBag className="h-3 w-3 text-white" />
                      </span>
                      <p className="text-sm">New order placed</p>
                      <span className="ml-auto text-xs text-gray-500">10m ago</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2 rounded-full bg-yellow-500 p-1">
                        <FileText className="h-3 w-3 text-white" />
                      </span>
                      <p className="text-sm">New blog post published</p>
                      <span className="ml-auto text-xs text-gray-500">1h ago</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2 rounded-full bg-purple-500 p-1">
                        <MessageSquare className="h-3 w-3 text-white" />
                      </span>
                      <p className="text-sm">New message received</p>
                      <span className="ml-auto text-xs text-gray-500">3h ago</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2 rounded-full bg-red-500 p-1">
                        <Bell className="h-3 w-3 text-white" />
                      </span>
                      <p className="text-sm">System alert</p>
                      <span className="ml-auto text-xs text-gray-500">5h ago</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        </Tabs>
        </div>

              )}