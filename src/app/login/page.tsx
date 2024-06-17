'use client'
import { InputForm } from "@/components/form/Input";
import { loginAction } from "@/lib/action/login";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function LoginPage() {
  const [state, registerState] = useFormState<any, FormData>(loginAction, undefined)
  return (
    <form name="login" action={registerState} className="absolute w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-xs lg:max-w-sm">
        <div className="border-2 shadow-md rounded-2xl px-8 pt-8 pb-8">
          <div className="mb-4">
            <InputForm type="text" name="login" placeholder="Login" />
            <InputForm type="password" name="password" placeholder="Password" />
          </div>
          {state?.error && <p className="text-red-500">{state.error}</p>}
          <div className="flex items-center justify-center">
            <button className="w-full btn btn-outline btn-success">Sign-in</button>
          </div>
          <div className="w-full flex justify-start link link-error">
            <Link className="mt-2" href="/login/register">Register</Link>
          </div>
        </div>
      </div>
    </form>
  );
}