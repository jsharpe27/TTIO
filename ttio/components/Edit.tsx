import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

import { Profile } from "@prisma/client"
import { AvatarFallback } from "@radix-ui/react-avatar"
import { User } from "@supabase/supabase-js"
import { Avatar, AvatarImage } from "./ui/avatar"
import { useToast } from './ui/use-toast'
import { CircleLoader } from "react-spinners";
import { useTheme } from "next-themes";
interface PProps {
  user: User
  profile: Profile
}

export function EditAccount({ user, profile }: PProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-primary text-secondary">Edit Account</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit account</DialogTitle>
          <DialogDescription>
            Make changes to your account here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              defaultValue={user.email}
              className="col-span-3"
              type="email"
            />
          </div>
          <Separator className="my-4" />
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-left">
             Password
            </Label>
            <Input
              id="password"
              placeholder="********"
              className="col-span-3"
              type="password"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password_verify" className="text-left">
             Password Verification
            </Label>
            <Input
              id="password_verify"
              placeholder="********"
              className="col-span-3"
              type="password"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => alert("Not available yet!")}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


export function EditProfile({ user, profile }: PProps) {
  const [image, setImage] = useState(profile.avatar);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false)
  const { toast } = useToast();
  const { theme } = useTheme();
  const handleImageChange = (e: any) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };
  const [formData, setFormData] = useState({
    name: profile.name || '',
    username: profile.username || '',
    email: profile.email || '',
    bio: profile.bio || '',
    website: profile.website || '',
    avatar: profile.avatar || image,
  });
  
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmitProfile = async (e: any) => {
    e.preventDefault();
    setLoading(true)
   formData.avatar = image;
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result)
        if(result.success == false) {
              setLoading(false)
              toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: 'Error with this username',
              })
          
        } else {
          setLoading(false)
          toast({
            title: "Success",
            description: "Profile updated successfully!",
            duration: 3000
          })
        }
      } else {
        setMessage('Error sending data to the API');
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: message,
        })
      }
    } catch (error) {
      setMessage('An error occurred while sending the request');
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: message,
      })
    }
    
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-primary text-secondary">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form onSubmit={handleSubmitProfile} >

            <center className="m-4">
          <label htmlFor="profileImage" className="cursor-pointer">
              <Avatar className="w-32 h-32 rounded-full bg-muted">
                <AvatarImage
                  src={`${image ? image : (profile.avatar ? profile.avatar : "")}`}
                  alt={`${profile.name}'s Avatar`}
                />
                <AvatarFallback className="uppercase text-xl flex items-center justify-center mx-auto">
                  {profile?.name?.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
          </label>
          <input
            id="profileImage"
            name="avatar"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            />
            </center>
          <div className="grid grid-cols-4 items-center gap-4 p-2">
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              className="col-span-3"
              value={formData.name}
              onChange={handleChange}
              />
          </div>
          <div className="grid grid-cols-4 items-center gap-4 p-2">
            <Label htmlFor="username" className="text-left">
              Username
            </Label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="col-span-3"
              />
          </div>
          <div className="grid grid-cols-4 items-center gap-4 p-2">
            <Label htmlFor="website" className="text-left">
              Website
            </Label>
            <Input
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="col-span-3"
              />
          </div>
        <DialogFooter className='mt-4'>
          <Button type="submit">
          {loading ? <CircleLoader size={16} color={theme === "light" ? "white" : "black"} /> : "Save changes"}
          </Button>
        </DialogFooter>
              </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
