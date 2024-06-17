'use server'
import { randomUUID } from "crypto";
import { LOGIN_PAGE } from "./login.mock";

interface ResponseMock {
  data: any,
  statusCode: number
}

export async function PostMock(data: { name: string, login: string, pass: string }): Promise<ResponseMock> {
  LOGIN_PAGE.push(data)
  return {
    data: 'ok',
    statusCode: 200
  }
}

export async function GetMock(login: string, pass: string): Promise<ResponseMock> {
  const result = LOGIN_PAGE.find(item => item.login === login && item.pass === pass)

  if (result) {
    return {
      data: randomUUID(),
      statusCode: 200
    }
  }

  return {
    data: '',
    statusCode: 401
  }
}

function generateToken() {
  return randomUUID()
}