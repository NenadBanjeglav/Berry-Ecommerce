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
import userCartStore, { CartItem } from "@/store";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import PriceFormater from "./PriceFormater";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createOrder } from "@/sanity/helpers";

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

interface Props {
  user: UserResource;
  orderItems: CartItem[];
}

const OrderForm = ({ user, orderItems }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { firstName, lastName, emailAddresses } = user;
  const { getItemCount, getSubtotalPrice, getTotalPrice, resetCart } =
    userCartStore();

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

  const onSubmit = async (data: any) => {
    setLoading(true);

    const orderNumber = crypto.randomUUID();
    const totalPrice = getTotalPrice();
    const discountedPrice = getSubtotalPrice();
    const amountDiscount = discountedPrice - totalPrice;

    const orderData = {
      _type: "order",
      orderNumber,
      clerkUserId: user.id,
      customerName: `${data.name} ${data.lastname}`,
      email: data.email,
      phone: data.phone,
      city: data.city,
      street: data.street,
      postalCode: data.postalCode,
      companyName: data.companyName,
      pib: data.pib,
      message: data.message,
      total: totalPrice,
      products: orderItems.map(({ product }) => ({
        _key: product._id,
        product: {
          _type: "reference",
          _ref: product._id,
        },
        quantity: getItemCount(product._id),
      })),
      discountedPrice,
      amountDiscount,
      createdAt: new Date().toISOString(),
      status: "confirmed",
    };

    try {
      const result = await createOrder(orderData);

      if (result.success) {
        toast.success("Order successfully placed!");
        router.push(`/success?orderNumber=${orderNumber}`);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Failed to create order:", error);
      toast.error("Failed to place the order. Please try again.");
    } finally {
      setLoading(false);
    }
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

        <Separator />
        <div>
          <h2 className="text-lg font-semibold">Your Order</h2>
        </div>
        <div className="lg:col-span-2">
          <div className="grid grid-cols-5 md:grid-cols-6 border rounded-tr-lg rounded-tl-lg bg-white p-2.5 text-base font-semibold">
            <h2 className="col-span-2 md:col-span-3">Product</h2>
            <h2> Price</h2>
            <h2 className=" text-right">Quant</h2>
            <h2 className=" text-right">Total</h2>
          </div>
          <div className="bg-white border border-t-0 rounded-br-lg rounded-bl-lg">
            {orderItems.map(({ product }) => {
              const itemCount = getItemCount(product._id);
              return (
                <div
                  key={product._id}
                  className="grid grid-cols-5 md:grid-cols-6 border-b p-2.5 last:border-b-0"
                >
                  <div className="col-span-2 md:col-span-3 flex items-center">
                    {product.image && (
                      <div className="border p-0.5 md:p-1 mr-2 rounded-md overflow-hidden group">
                        <Image
                          src={urlFor(product.image).url()}
                          alt="product image"
                          width={300}
                          height={300}
                          className="size-10 md:w-full md:h-14 object-cover group-hover:scale-105 overflow-hidden hoverEffect"
                        />
                      </div>
                    )}
                    <h2 className="text-sm">{product.name}</h2>
                  </div>
                  <div className="flex items-center">
                    <PriceFormater amount={product.price} />
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="text-sm font-semibold text-darkText">
                      {itemCount}
                    </p>
                  </div>
                  <div className="flex items-center justify-end">
                    <PriceFormater
                      amount={product.price ? product.price * itemCount : 0}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className=" w-full bg-white p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 w-full">
              <div className="flex justify-between items-center">
                <span>Price</span>
                <PriceFormater amount={getTotalPrice()} />
              </div>

              <div className="flex place-items-center justify-between">
                <span> Discount</span>
                <PriceFormater amount={getSubtotalPrice() - getTotalPrice()} />
              </div>
              <Separator />
              <div className="flex place-items-center justify-between">
                <span> Total</span>
                <PriceFormater amount={getSubtotalPrice()} />
              </div>
            </div>
          </div>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Order"}
        </Button>
      </form>
    </Form>
  );
};

export default OrderForm;
