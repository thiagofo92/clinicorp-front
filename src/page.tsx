import { InputForm } from "@/components/form/Input";
import Link from "next/link";

export default function Home() {
  return (
    <div className="absolute w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-xs lg:max-w-sm">
        <div className="border-2 shadow-md rounded-2xl px-8 pt-8 pb-8">
          <div className="mb-4">
            <InputForm placeholder="Login" />
            <InputForm placeholder="Password" />
          </div>
          <div className="flex items-center justify-center">
            <button className="w-full btn btn-outline btn-success">Sign-in</button>
          </div>
          <div className="w-full flex justify-start link link-error">
            <Link className="mt-2" href="/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
