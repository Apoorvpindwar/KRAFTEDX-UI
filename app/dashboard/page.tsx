import { currentUser } from "@clerk/nextjs/server";
import { format } from "date-fns";
import { 
  CircleUser, 
  Calendar, 
  Clock, 
  Shield, 
  Activity,
  Mail
} from "lucide-react";

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

export default async function DashboardPage() {
  const user = await currentUser();
  
  if (!user) {
    return null;
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Welcome Back
            </CardTitle>
            <CircleUser className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.firstName || user.emailAddresses[0].emailAddress.split('@')[0]}</div>
            <p className="text-xs text-muted-foreground">
              {user.emailAddresses[0].emailAddress}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Login</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {format(new Date(), "PP")}
            </div>
            <p className="text-xs text-muted-foreground">
              {format(new Date(), "p")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Account Status
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active</div>
            <p className="text-xs text-muted-foreground">
              Your account is in good standing
            </p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Session Time
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0:42:53</div>
                <p className="text-xs text-muted-foreground">
                  Current session duration
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Account Age
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1 day</div>
                <p className="text-xs text-muted-foreground">
                  Since account creation
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Security Level
                </CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Basic</div>
                <p className="text-xs text-muted-foreground">
                  Enable 2FA for enhanced security
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Activity Score
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Low</div>
                <p className="text-xs text-muted-foreground">
                  Based on recent account activity
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Account Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="bg-card/50 p-6 rounded-lg border">
                  <h3 className="text-xl font-bold mb-2">Welcome to your dashboard!</h3>
                  <p className="text-muted-foreground mb-4">
                    This is a protected page that's only accessible after authentication. Here you can manage your account settings, view activity, and more.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="flex items-start space-x-4">
                      <Mail className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Email Verification</h4>
                        <p className="text-sm text-muted-foreground">
                          Your email is verified and ready to go.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Shield className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Account Security</h4>
                        <p className="text-sm text-muted-foreground">
                          Consider enabling two-factor authentication.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your recent account activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="rounded-full w-9 h-9 flex items-center justify-center bg-primary/10 mr-3">
                      <CircleUser className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Login successful
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(), "PPp")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="rounded-full w-9 h-9 flex items-center justify-center bg-primary/10 mr-3">
                      <CircleUser className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Account created
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(), "PPp")}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>
                Recent activity on your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full w-10 h-10 flex items-center justify-center bg-primary/10">
                        <Activity className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {[
                            "Signed in successfully",
                            "Updated profile information",
                            "Changed password",
                            "Viewed dashboard",
                            "Account created",
                          ][i]}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(
                            new Date(
                              Date.now() - 1000 * 60 * 60 * (i + 1)
                            ),
                            "PPp"
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {i === 0
                        ? "Just now"
                        : i === 1
                        ? "1 hour ago"
                        : `${i + 1} hours ago`}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <p className="text-sm font-medium">Email Address</p>
                <p className="text-sm text-muted-foreground">
                  {user.emailAddresses[0].emailAddress}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Account Created</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(), "PPP")}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">
                  Not enabled
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}