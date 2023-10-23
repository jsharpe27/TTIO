"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "./ui/use-toast";
import { User } from "@supabase/supabase-js";
import db from "@/lib/db";
import { Profile } from "@prisma/client";

interface PProps {
    user: User
    profile: Profile
}
const ProfileSection = ({ user, profile }: PProps) => {
   
      const { toast } = useToast();
      if(!profile) return toast({
        variant: "destructive",
        description: "You should create a profile!",
        duration: 5000,
      });
    return (
        <div className="flex flex-col md:flex-row h-full">
      <div className="w-full md:w-1/2 p-4 md:p-16">
        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full mx-auto mb-4">
        
          <Avatar className="w-48 h-48 rounded-full mb-4">
      <AvatarImage src={`${profile?.avatar}`} alt="@shadcn" />
      <AvatarFallback className="uppercase">{profile?.name?.slice(0, 2)}</AvatarFallback>
    </Avatar>
        </div>

        <p className="text-2xl font-bold">{profile?.name}</p>
        <p className="text-gray-500">{profile?.bio}</p>
      </div>
      <div className="w-full md:w-1/2 p-4 md:p-16">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="w-full mt-4">
            <TabsTrigger value="account" className="w-1/2">
              Account
            </TabsTrigger>
            <TabsTrigger value="profile" className="w-1/2">
              Profile
            </TabsTrigger>
          </TabsList>
          <div className="mt-4">
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    Account Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/2">
                    <p className="text-lg">Email</p>
                    <CardDescription>{user.email}</CardDescription>
                  </div>
                  <div className="w-full md:w-1/2">
                    <p className="text-lg">Auth Type</p>
                    <CardDescription>{user.app_metadata.provider}</CardDescription>
                  </div>
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    Profile Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/3">
                    <p className="text-lg">Name</p>
                    <CardDescription>{profile?.name}</CardDescription>
                  </div>
                  <div className="w-full md:w-1/3">
                    <p className="text-lg">Username</p>
                    <CardDescription>{profile?.username}</CardDescription>
                  </div>
                  <div className="w-full md:w-1/3">
                    <p className="text-lg">Website</p>
                    <CardDescription>{profile?.website}</CardDescription>
                  </div>
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
    )
}
export default ProfileSection;