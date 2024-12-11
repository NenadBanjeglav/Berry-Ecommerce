"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { UserResource } from "@clerk/types";
import { Separator } from "./ui/separator";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  lastname: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  city: z.string().min(1, "City is required"),
  street: z.string().min(1, "Street name and number is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  companyName: z.string().optional(),
  pib: z.string().optional(),
  message: z.string().optional(),
  acceptTerms: z.boolean().refine((val) => val, {
    message: "You must accept the rules and conditions",
  }),
});

const OrderForm = ({ user }: { user: UserResource | undefined }) => {
  const { firstName, lastName, emailAddresses } = user!;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: firstName || "",
      lastname: lastName || "",
      email: emailAddresses[0].toString() || "",
      phone: "",
      city: "",
      street: "",
      postalCode: "",
      companyName: "",
      pib: "",
      message: "",
      acceptTerms: false,
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="name">
                  Name <span className="text-red-500">*</span>
                </Label>
                <FormControl>
                  <Input id="name" placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="lastname">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <FormControl>
                  <Input
                    id="lastname"
                    placeholder="Enter your last name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="email">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="phone">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <FormControl>
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="city">
                  City <span className="text-red-500">*</span>
                </Label>
                <FormControl>
                  <Input id="city" placeholder="Enter your city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="street">
                  Street Name and Number <span className="text-red-500">*</span>
                </Label>
                <FormControl>
                  <Input
                    id="street"
                    placeholder="Enter your street name and number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="postalCode">
                  Postal Code <span className="text-red-500">*</span>
                </Label>
                <FormControl>
                  <Input
                    id="postalCode"
                    placeholder="Enter your postal code"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="companyName">Company Name (Optional)</Label>
              <FormControl>
                <Input
                  id="companyName"
                  placeholder="Enter your company name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pib"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="pib">PIB (Optional)</Label>
              <FormControl>
                <Input id="pib" placeholder="Enter PIB" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="message">Message (Optional)</Label>
              <FormControl>
                <Textarea
                  id="message"
                  placeholder="Enter your message"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="acceptTerms"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="acceptTerms"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="acceptTerms">
                    I accept the terms and conditions for ordering
                  </Label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Order</Button>
      </form>
    </Form>
  );
};

export default OrderForm;
