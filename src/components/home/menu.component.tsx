'use client'
import Link from "next/link"
import Image from 'next/image'
import { useState } from "react"
import editIcon from '@/assets/bullet-list-svgrepo-com.svg'

interface SeedData {
  id: string,
  name: string,
}

interface MenuProp {
  userName: string
}


export default function MenuComponent(prop: MenuProp) {
  return (
    <div className="w-full">
      <div className="text-center mt-4">
        {prop.userName}
      </div>
      <LoadMenu />
    </div>
  )
}

function LoadMenu() {
  const [list, setList] = useState<SeedData[]>([])
  // getList()
  //   .then(t => setList(t))
  //   .catch(err => console.log(err))
  return (
    <>
      <ul className="menu rounde-box flex items-center">
        <li className="menu-title hover:outline-2 pb-3">
          Project
        </li>
        <button className="w-full btn mb-5" onClick={async () => {
          const data = await addProject()
          setList([data, ...list])
        }}>
          + Adicionar
        </button>
        {list.map((value, index) => {
          return (
            <li className="w-full flex flex-col" key={index}>
              {/* <button className="relative w-12 max-w-[40px] h-12 max-h-[40px] rounded-lg hover:shadow-xl"
                type="button"
                onClick={() => { }} >
                <span className="absolute transform -translate-x-2/4 -translate-y-2/4 top-2/4 left-2/4">
                  <Image priority src={editIcon} alt="Edit" />
                </span>
              </button> */}
              <Link href={`/home/projects/${value.id}`} className="flex justify-center">{value.name}</Link>
            </li>
          )
        })}
      </ul>

    </>
  )
}

async function addProject() {
  const id = Date.now().toString()
  return {
    id,
    name: `${id}`
  }
}

async function getList() {
  return [
    {
      id: '12',
      name: 'Project 1',
    },
    {
      id: '34',
      name: 'Project 2'
    },
    {
      id: '45',
      name: 'Project 3'
    },
    {
      id: '56',
      name: 'Project 4'
    },
    {
      id: '67',
      name: 'Project 5'
    },
    {
      id: '78',
      name: 'Project 6'

    },
  ]
}