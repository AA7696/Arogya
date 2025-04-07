
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
// import { useMutation } from "@tanstack/react-query";
import { Activity } from 'lucide-react';


const SignIn = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //   const mutation = useMutation({
    //     mutationFn: async () => {
    //       const res = await fetch("/api/auth/signin", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ email, password }),
    //       });
    //       if (!res.ok) throw new Error("Invalid credentials");
    //       return res.json();
    //     },
    //     onSuccess: (data) => {
    //       console.log("Login successful:", data);
    //       // Save token, redirect, etc.
    //     },
    //     onError: (error) => {
    //       alert("Login failed: " + error.message);
    //     },
    //   });

    //   const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     mutation.mutate();
    //   };

    return (
        <section className="min-h-screen flex flex-col gap-4 items-center justify-center p-10">
            <div className=" flex flex-row items-center gap-1.5">
                <Activity size={54} color='#1FBCF9' className=' font-bold' />
                <h3 className=" text-4xl md:text-3xl font-semibold text-white">Arogya</h3>
            </div>
            <div className="w-full max-w-md  p-8 rounded-4xl shadow-3xl shadow-gray-400 border-2 border-white ">
                <h2 className="text-2xl font-bold mb-6 text-center">Create Your Account</h2>
                <form className="space-y-5">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className=" mt-2.5"
                        />
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className=" mt-2.5"
                        />
                    </div>

                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-2.5"
                        />
                    </div>

                    <Button type="submit" className="w-full bg-[#1FBCF9]" >
                        Sign In
                    </Button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account? <a className="text-blue-600 hover:underline">Log In</a>
                </p>
            </div>
        </section>
    );
};

export default SignIn;
