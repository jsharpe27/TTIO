'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { Input } from "./ui/input";
import Link from "next/link";
import { Button } from "./ui/button";
import { CircleLoader } from "react-spinners";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { useLoginModal } from "@/hooks/LoginModal";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSignUpState } from "@/hooks/SignUpState";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Please enter a password of at least 6 characters",
  }),
});

const AuthForm = () => {
  const [logginIn, setlogginIn] = useState(true);
  const loginState = useLoginModal();
  const signupState = useSignUpState();
  const supabase = createClientComponentClient();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {toast} = useToast();
  const router = useRouter();

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: 
    z.infer<typeof formSchema>
    ) => {
    try {

      if(logginIn){
        var {error} = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });
      }
      else{
        var {error} = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
        }
        );
      }

      if(error){
        throw error;
      }

      toast({
        description: 'Success',
        duration: 2000,
      })

      console.log('[SUCCESS SUBMITTING LOGIN/SIGNUP]', error);
      
      
      loginState.close();
      router.refresh();

      if(logginIn){
        router.push('/')
      }
      else{
        useSignUpState.setState({email: values.email});
        router.push('/verify-email')
      }
      
    } catch (error) {
      toast({
        variant: "destructive",
        description: `something went wrong, please try again later.`,
        duration: 5000,
      });

      console.log('[ERROR SUBMITTING LOGIN/SIGNUP]', error);
      
    }
  };


  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-y-3 w-full items-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div
          className="flex flex-col w-full items-center justify-center space-y-2"
        >
          <Button
            className="flex items-center gap-x-2"
            variant={'outline'}
          >
            {logginIn ? 'Login with Google+': 'Sign Up with Google+'}
            <div
              className="relative w-5 h-5"
            >
              <Image
                src={'/google-logo.png'}
                alt="logo"
                layout='fill'
                objectFit='contain'
              />
            </div>
          </Button>
          {logginIn && <Button
            className="flex items-center gap-x-2"
            variant={'secondary'}
          >
            Login Anonymously
          </Button>}
        </div>
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem
              className="w-full"
            >
              <FormControl>
                <Input disabled={isLoading} placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}

          render={({ field }) => (
            <FormItem
              className="w-full"
            >
              <FormControl>
                <Input disabled={isLoading} type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {logginIn && <Link href="/somewhere"
          className="text-xs text-blue-700 hover:underline cursor-pointer"
        >
          Forgot your password?
        </Link>}

        <Button
          size={'lg'}
          className="font-bold text-lg rounded-3xl"
          disabled={isLoading}
          variant={'outline'}
        >
          {isLoading ? <CircleLoader size={16} /> : logginIn ? 'Login': 'Sign Up'}
        </Button>

        <span onClick={() => setlogginIn(!logginIn)}
          className="text-xs text-primary/60 hover:underline cursor-pointer"
        >
          {logginIn ? 'Or create a new Account?': 'Or Login to your Account?'}
        </span>
      </form>
    </Form>
  )
}

export default AuthForm