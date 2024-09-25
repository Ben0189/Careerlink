"use client";
import * as z from "zod";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form,FormControl,FormField,FormItem, FormLabel, FormMessage } from "@/components/form";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/select";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import "react-quill/dist/quill.snow.css";
import "../app/globals.css";

const formSchema = z
  .object({
    FullName: z.string(),
    email: z.string(),    
    phone: z.string(),
    jobtype: z.string(),
    jobskills: z.string(),
    Bio: z.string()
  })

export default function Profile() {
  const form = useForm <z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      FullName: "",
      email: "",
      phone:"",
      jobtype: "",
      jobskills: "",
      Bio: "",
    },
  });

  const handleSubmit =()=>{
    console.log("Clicked Submit");
  };
  const router = useRouter();
  const handleCancel=()=>{

    router.push('/'); 
  };

  return(
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          USER PROFILE 
          
        </p>
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(handleSubmit)} 
          className="max-w-md w-full flex-col gap-4"
        >
          <FormField 
            control={form.control} 
            name="FullName" 
            render={({ field }) => {
              return (
              <FormItem>
                <FormLabel className="text-black">Full Name</FormLabel>
                
                  <FormControl>
                    <Input className="text-black" placeholder="Full Name" type="FullName" {...field}/>
                  </FormControl>
                
                <FormMessage className="text-red-500"/>
              </FormItem>
            );
            }}
          />
          <FormField 
            control={form.control} 
            name="email" 
            render={({ field }) => {
              return (
              <FormItem>
                
                <FormLabel className="text-black">Email</FormLabel>
                    <FormControl>
                      <Input className="text-black" placeholder="Email" type ="email" {...field}/>
                    </FormControl>      
                <FormMessage className="text-red-500"/>
              </FormItem>
            );
            }}
          />

<FormField 
            control={form.control} 
            name="phone" 
            render={({ field }) => {
              return (
              <FormItem>
                <FormLabel className="text-black mt-4">Phone</FormLabel>
                
                <FormControl>
                  <Input className="text-black mt-4" placeholder="Mobile Phone" type ="phone" {...field}/>
                </FormControl>
                
                
                <FormMessage className="text-red-500"/>
              </FormItem>
            );
            }}
          />

<FormField 
            control={form.control} 
            name="jobtype" 
            render={({ field }) => {
              return (
              <FormItem>
                <FormLabel className="text-black">Job Type</FormLabel>
                <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a work type"  />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white bg-opacity-95">
                <SelectItem value="Full time" className="text-black">Full time</SelectItem>
                <SelectItem value="Part time" className="text-black">Part time</SelectItem>
                <SelectItem value="Contract/Temp" className="text-black">Contract/Temp</SelectItem>
                <SelectItem value="Casual/Vacation" className="text-black">Casual/Vacation</SelectItem>
                </SelectContent>
                </Select>
                <FormMessage className="text-red-500"/>
              </FormItem>
            );
            }}
          />

<FormField 
            control={form.control} 
            name="jobskills" 
            render={({ field }) => {
              return (
              <FormItem>
                <FormLabel className="text-black">Job Skills</FormLabel>
                <FormControl>
                  <Input className="text-black" placeholder="Please list any programming languages" type ="jobskills" {...field}/>
                </FormControl>
                <FormMessage className="text-red-500"/>
              </FormItem>
            );
            }}
          />

<FormField
            control={form.control}
            name="Bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Bio</FormLabel>
                <FormControl>
                  <Input className="text-black" placeholder="Tell us about yourself" type ="jobskills" {...field}/>
                </FormControl>
                
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
           <div className="flex space-x-4"> 
            <Button type="submit" className="w-full md:w-auto">Submit</Button>
            <Button type="button" className="w-full md:w-auto" onClick= {handleCancel}>
              Cancel
            </Button>
      </div>
         
        </form>
      </Form>
            
    </main>
    
  )
}