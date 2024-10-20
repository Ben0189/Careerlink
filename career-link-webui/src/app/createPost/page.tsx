"use client";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import NavigationBar from '../navbar';
import "./createPost.css";

const formSchema = z.object({
  jobTitle: z.string(),
  companyName: z.string(),
  workPlaceType: z
    .string()
    .nonempty({ message: "Please select a workplace type" }),
  jobLocation: z.string(),
  jobType: z.string().nonempty({ message: "Please select a work type" }),
  description: z
    .string()
    .nonempty({ message: "Please provide a job description" }),
});

export default function CreatePost() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: "",
      companyName: "",
      workPlaceType: "",
      jobLocation: "",
      jobType: "",
      description: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };

  return (
    <>
    <NavigationBar /> {/* NavigationBar 放在这里 */}
    <main className="flex min-h-screen flex-col items-center justify-between p-12 bg-gray-100">
      {/* Overall form container with border and shadow */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-3xl w-full space-y-8 bg-white p-8 rounded-lg shadow-lg border border-gray-300"
        >
          {/* Job Details Section */}
          <div className="border-b pb-4 mb-8">
            <h2 className="text-lg font-semibold">Job details</h2>

            {/* Grid Layout for Fields */}
            <div className="grid grid-cols-2 gap-6 mt-4">
              {/* Job Title */}
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Job title</FormLabel>
                    <FormControl>
                      <Input
                        className="text-black border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Job Title"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* Company */}
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Company</FormLabel>
                    <FormControl>
                      <Input
                        className="text-black border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Company Name"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* Workplace Type */}
              <FormField
                control={form.control}
                name="workPlaceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Workplace type</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                          <SelectValue placeholder="Select a workplace type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        <SelectItem value="On-site" className="text-black">
                          On-site
                        </SelectItem>
                        <SelectItem value="Remote" className="text-black">
                          Remote
                        </SelectItem>
                        <SelectItem value="Hybrid" className="text-black">
                          Hybrid
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* Job Location */}
              <FormField
                control={form.control}
                name="jobLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Job location</FormLabel>
                    <FormControl>
                      <Input
                        className="text-black border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Job Location"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* Job Type */}
              <FormField
                control={form.control}
                name="jobType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Job type</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                          <SelectValue placeholder="Select a job type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        <SelectItem value="Full-time" className="text-black">
                          Full-time
                        </SelectItem>
                        <SelectItem value="Part-time" className="text-black">
                          Part-time
                        </SelectItem>
                        <SelectItem value="Contract" className="text-black">
                          Contract
                        </SelectItem>
                        <SelectItem value="Casual" className="text-black">
                          Casual
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Description Section */}
          <div>
            <h2 className="text-lg font-semibold">Description</h2>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Job Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="text-black border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter job description here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="mt-12">
            <Button type="submit" className="w-full bg-blue-600 text-white py-3">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </main>
    </>
  );
}
