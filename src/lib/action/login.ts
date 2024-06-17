'use server'
import { redirect } from "next/navigation"
import { GetMock, PostMock } from "../mock/fetch.mock"

export async function loginAction(prevState: { error: string | undefined }, data: FormData) {
  const login = data.get('login') as string
  const pass = data.get('password') as string

  const result = await GetMock(login, pass)
  if (result.statusCode === 401) return { error: 'Invalid login or password' }

  redirect('/home')
}

export async function registerLogin(prevState: { error: string | undefined }, data: FormData) {
  const name = data.get('name')! as string
  console.log('here')
  const login = data.get('login')! as string
  const pass = data.get('password')! as string
  const confirm = data.get('confirm')! as string

  if (pass !== confirm) {
    return { error: 'Not the same password' }
  }

  await PostMock({
    name,
    login,
    pass,
  })

  redirect('/login')
}