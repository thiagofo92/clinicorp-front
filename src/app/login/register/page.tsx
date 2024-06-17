'use client'
import { InputForm } from "@/components/form/Input";
import { registerLogin } from "@/lib/action/login";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function RegisterPage() {
  const [state, registerState] = useFormState<any, FormData>(registerLogin, undefined)
  return (
    <div className="absolute w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-xs lg:max-w-sm">
        <form name="register" action={registerState} className="border-2 shadow-md rounded-2xl px-8 pt-8 pb-8">
          <FormRegister state={state} />
          <ButtonRegister />
        </form>
      </div>
    </div>
  )
}


function FormRegister(prop: { state: any }) {
  return (
    <div className="mb-4">
      <InputForm type="text" name="name" placeholder="name" />
      <InputForm type="text" name="login" placeholder="login" />
      <InputForm type="password" name="password" placeholder="password" />
      <InputForm type="password" name="confirm" placeholder="confirm" />
      {prop.state?.error && <p className="text-red-500">{prop.state.error}</p>}
    </div>
  )
}

function ButtonRegister() {
  return (
    <div className="flex justify-around">
      <div className="">
        <Link href="/login">
          <button className="w-full btn btn-outline btn-error">Cancel</button>
        </Link>
      </div>
      <div className="">
        <button className="w-full btn btn-outline btn-success">Register</button>
      </div>
    </div>
  )
}