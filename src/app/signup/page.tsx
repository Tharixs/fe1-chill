"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { PasswordInput } from "@/components/ui/password-input";
import { useRouter } from "next/navigation";
import { handleSignUp } from "../actions/authActions";
import { signUpSchema } from "@/lib/zod";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";

const FormFields = [
  {
    id: "name",
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Masukkan name",
  },
  {
    id: "email",
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Masukkan email",
  },
  {
    id: "password",
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Masukkan kata sandi",
  },
  {
    id: "confirmPassword",
    name: "confirmPassword",
    label: "Konfirmasi Kata Sandi",
    type: "password",
    placeholder: "Masukkan kata sandi",
  },
];

export default function Page() {
  const [isMobile, setIsMobile] = useState(false);
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });
  const router = useRouter();

  useEffect(() => {
    // Check if the screen is mobile
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit(async (val) => {
      // Handle form submission
      const result = await handleSignUp({
        name: val.name,
        email: val.email,
        password: val.password,
        confirmPassword: val.confirmPassword,
      });
      if (result) {
        // show success message
        toast.success("Berhasil membuat akun");
        // redirect to dashboard use router next
        router.push("/signin");
      } else {
        // show error message
        toast.error("Gagal membuat akun");
      }
    })();
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Image
        src={"/bg-register.jpeg"}
        width={2070}
        height={1380}
        alt="hero image"
        className={`absolute inset-0 ${
          isMobile ? "h-[100vh]" : "h-full"
        } w-full object-cover bg-center bg-no-repeat`}
      />

      <main className="relative z-10 flex items-center justify-center mt-14 md:mt-24 px-8 lg:px-12 py-12 md:py-24">
        <Card className="w-[450px] bg-neutral-900/85 border-none">
          <Image
            src="/Logo.svg"
            width={100}
            height={100}
            alt="logo"
            className="mx-auto"
          />
          <CardHeader>
            <CardTitle className="font-bold text-2xl text-white text-center">
              Daftar
            </CardTitle>
            <CardDescription className="font-light text-sm text-white text-center">
              Selamat datang!
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="grid w-full items-center gap-4 space-y-4">
                <Form {...form}>
                  {FormFields.map((item) => (
                    <div key={item.id} className="flex flex-col space-y-1.5">
                      <FormField
                        control={form.control}
                        name={
                          item.name as
                            | "name"
                            | "email"
                            | "password"
                            | "confirmPassword"
                        }
                        shouldUnregister
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">
                              {item.label}
                            </FormLabel>
                            <FormControl>
                              {item.type === "password" ? (
                                <PasswordInput
                                  id={item.id}
                                  className="text-white rounded-full border-neutral-600"
                                  placeholder={item.placeholder}
                                  {...field}
                                />
                              ) : (
                                <Input
                                  id={item.id}
                                  placeholder={item.placeholder}
                                  className="text-white rounded-full border-neutral-600"
                                  type={item.type}
                                  {...field}
                                />
                              )}
                            </FormControl>
                            {item.id === "conf-password" && (
                              <FormDescription className="text-white font-light text-xs">
                                Sudah punya akun ?{" "}
                                <Link href="/signin">
                                  <span className="font-semibold">Masuk</span>
                                </Link>
                              </FormDescription>
                            )}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </Form>
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-2 mt-4">
              <Button
                type="submit"
                variant="default"
                className="bg-neutral-700 rounded-full w-full text-xs"
              >
                Daftar
              </Button>
              <p className="text-neutral-300 text-xs font-light">Atau</p>
              <Button
                variant="outline"
                className="bg-transparent rounded-full w-full text-white text-xs"
              >
                <Image
                  src="/icon-google.svg"
                  alt="google icon"
                  width={18}
                  height={18}
                  className="mr-2"
                />
                Daftar dengan google
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
}
