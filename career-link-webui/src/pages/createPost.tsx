"use client";
import * as z from "zod";
import { Controller, useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form,FormControl,FormField,FormItem, FormLabel, FormMessage } from "@/components/form";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/select";

import "react-quill/dist/quill.snow.css";
import "../app/globals.css";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const formSchema = z
  .object({
    jobTitle: z.string(),
    companyName: z.string(),    
    workPlaceType: z.string().nonempty({ message: "Please select a workplace type" }),
    jobLocation: z.string(),
    jobType: z.string().nonempty({ message: "Please select a work type" }),
    description: z.string().nonempty({ message: "Please provide a job description" }),
  })

export default function CreatePost() {
  const form = useForm <z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      jobTitle: "",
      companyName: "",
      workPlaceType:"",
      jobLocation: "",
      jobType: "",
      description: "",
    },
  });

  const handleSubmit =(values: z.infer<typeof formSchema>)=>{
    console.log({values});
  };

  return(
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(handleSubmit)} 
          className="max-w-md w-full flex-col gap-4"
        >
          <FormField 
            control={form.control} 
            name="jobTitle" 
            render={({ field }) => {
              return (
              <FormItem>
                <FormLabel className="text-black">Job Title</FormLabel>
                <FormControl>
                  <Input className="text-black" placeholder="Job Title" type ="jobTitle" {...field}/>
                </FormControl>
                <FormMessage className="text-red-500"/>
              </FormItem>
            );
            }}
          />

          <FormField 
            control={form.control} 
            name="companyName" 
            render={({ field }) => {
              return (
              <FormItem>
                <FormLabel className="text-black">Company</FormLabel>
                <FormControl>
                  <Input className="text-black" placeholder="Company Name" type ="companyName" {...field}/>
                </FormControl>
                <FormMessage className="text-red-500"/>
              </FormItem>
            );
            }}
          />

          <FormField 
            control={form.control} 
            name="workPlaceType" 
            render={({ field }) => {
              return (
              <FormItem>
                <FormLabel className="text-black">Workplace Type</FormLabel>
                <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a workplace type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white bg-opacity-95">
                  <SelectItem value="Full time" className="text-black">On site</SelectItem>
                  <SelectItem value="Part time" className="text-black">Remote</SelectItem>
                  <SelectItem value="Contract/Temp" className="text-black">Hybird</SelectItem>
                </SelectContent>
                </Select>
                <FormMessage className="text-red-500"/>
              </FormItem>
            );
            }}
          />

          <FormField 
            control={form.control} 
            name="jobType" 
            render={({ field }) => {
              return (
              <FormItem>
                <FormLabel className="text-black">Job Type</FormLabel>
                <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a work type" />
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
            name="jobLocation" 
            render={({ field }) => {
              return (
              <FormItem>
                <FormLabel className="text-black">Job Location</FormLabel>
                <FormControl>
                  <Input className="text-black" placeholder="Job Location" type ="jobLocation" {...field}/>
                </FormControl>
                <FormMessage className="text-red-500"/>
              </FormItem>
            );
            }}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Job Description</FormLabel>
                <Controller
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <ReactQuill
                      theme="snow"
                      value={field.value}
                      onChange={field.onChange}
                      className="text-black"
                    />
                  )}
                />
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full text-black">Submit</Button>
        </form>
      </Form>

    </main>
  )
}