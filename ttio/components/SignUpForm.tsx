'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { Input } from "./ui/input";
import Link from "next/link";
import { Button } from "./ui/button";
import { CircleLoader } from "react-spinners";

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
    password: z.string().min(6, {
        message: "Please enter a password of at least 6 characters",
    }),
});

const AuthForm = () => {

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: any) => {
    console.log('SUBMITTING', values);
  };


  return (
        <Form {...form}>
            <form
                className="flex flex-col gap-y-3 w-full items-center"
                onSubmit={form.handleSubmit(onSubmit)}
            >
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

                <Button
                  size={'lg'}
                  className="font-bold text-lg rounded-3xl"
                  disabled={isLoading}
                >
                  {isLoading ? <CircleLoader size={16}/> : 'Signup'}
                </Button>
            </form>
        </Form>
  )
}

export default AuthForm