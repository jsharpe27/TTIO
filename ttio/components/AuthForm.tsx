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
import { useState, useRef } from "react";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { useLoginModal } from "@/hooks/LoginModal";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSignUpState } from "@/hooks/SignUpState";
import { useTheme } from "next-themes";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha"
import { verifyCaptcha } from "@/lib/utils";

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
  const [googleLoading, setgoogleLoading] = useState(false); // [TODO] use this to show loading state for google auth
  const [anonUserCheck, setAnonUserCheck] = useState(false); 
  const loginState = useLoginModal();
  const signupState = useSignUpState();
  const supabase = createClientComponentClient();
  const { theme } = useTheme();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  

  const isLoading = form.formState.isSubmitting;

  async function handleCaptchaSubmission(token: string | null) {
    setAnonUserCheck(true);

    await verifyCaptcha(token)
      .then(() => {
        localStorage.setItem('anonToken', token!)
        loginState.close();
      })
      .catch((error) => {
        console.log('[ERROR VERIFYING CAPTCHA]', error);
        toast({
          variant: "destructive",
          description: "Captcha verification failed, please try again.",
          duration: 2000,
        });
      });

      setAnonUserCheck(false);
    
  }

  const onSubmit = async (values:
    z.infer<typeof formSchema>
  ) => {
    try {

      if (logginIn) {
        var { error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });
      }
      else {
        var { data, error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
          options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}`,
          }
        }
        );

        console.log('[SIGNUP DATA]', data);
        await axios.post('/api/profile', {
          email: values.email,
          userId: data?.user?.id,
        });

      }

      if (error) {
        throw error;
      }

      toast({
        description: 'Success',
        duration: 2000,
      })

      console.log('[SUCCESS SUBMITTING LOGIN/SIGNUP]', error);

      loginState.close();
      router.refresh();

      if (logginIn) {
        router.push('/')
      }
      else {
        useSignUpState.setState({ email: values.email });
        router.push('/verify-email')
      }

    } catch (error: any) {
      let description = "";
      switch (error.toString()) {
        case "AuthApiError: Invalid login credentials":
          description = "Invalid login credentials!"
          break;
        case "AuthApiError: Email not confirmed":
          description = "Email not confirmed"
          break;
        default:
          description = `something went wrong, please try again later.`
          break;
      }
      toast({
        variant: "destructive",
        description: description,
        duration: 5000,
      });

      console.log('[ERROR SUBMITTING LOGIN/SIGNUP]', error);

    }
  };

  const handleGoogleauth = async () => {
    setgoogleLoading(true);
    setTimeout(async () => {
      const {data, error} = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      console.log('[GOOGLE AUTH]', data, error);
      setgoogleLoading(false);
    }, 1000);
  }

  return (
    <div
      className="h-full w-full flex flex-col items-center justify-center space-y-2"
    >
      <Button
        className="flex items-center gap-x-2 w-64"
        variant={'outline'}
        onClick={handleGoogleauth}
      >
        {googleLoading ? <CircleLoader size={16} color={theme === "light" ? "black" : "white"} /> : logginIn ? 'Login with Google+' : 'Sign Up with Google+'}
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
      {logginIn && 
      
        <>
           {anonUserCheck && <ReCAPTCHA
              sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
              ref={recaptchaRef}
              onChange={handleCaptchaSubmission}
              className="absolute z-50"
            />
            }

            <Button type="submit"
              disabled={anonUserCheck}
              className="w-64"
              variant={'default'}
              onClick={() => setAnonUserCheck(!anonUserCheck)}
            >
              {anonUserCheck ? <CircleLoader 
                size={16} 
                color={theme === "light" ? "white" : "black"}
              /> : 'Login as Anonymous'}
            </Button>
          </>

      }

      <Form {...form}>
        <form
          className="flex flex-col gap-y-3 w-full items-center"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div
            className="flex flex-col w-full items-center justify-center space-y-2"
          >
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
            {isLoading ? <CircleLoader size={16} color={theme === "light" ? "black" : "white"} /> : logginIn ? 'Login' : 'Sign Up'}
          </Button>

          <span onClick={() => setlogginIn(!logginIn)}
            className="text-xs text-primary/60 hover:underline cursor-pointer"
          >
            {logginIn ? 'Or create a new Account?' : 'Or Login to your Account?'}
          </span>
        </form>
      </Form>
    </div>
  )
}

export default AuthForm