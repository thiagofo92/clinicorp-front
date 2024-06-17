'use client'
import Image from "next/image"
import { useState } from "react"
import editIcon from '@/assets/bullet-list-svgrepo-com.svg'
import trashIcon from '@/assets/trash-svgrepo-com.svg'
import MenuComponent from "@/components/home/menu.component"

interface PropTable {
  data: Data[]
  openModal: (input: DataModal) => void
  onChangeCheckBox: (index: string) => (e: any) => void
  onDelete: (index: string) => (e: any) => void
}

interface Data {
  id: string,
  title: string,
  description: string,
  createdAt: string,
  status: boolean
}

interface DataModal {
  id: string,
  title: string,
  description: string,
  status: boolean
}

const listData = [{
  id: Date.now().toString() + Math.random().toString(),
  title: 'pending',
  description: 'test to change status - 0',
  createdAt: new Date().toLocaleDateString(),
  status: false
},
{
  id: Date.now().toString() + Math.random().toString(),
  title: 'completed',
  description: 'test to change status + 1',
  createdAt: new Date().toLocaleDateString(),
  status: true
},
{
  id: Date.now().toString() + Math.random().toString(),
  title: 'completed',
  description: 'test to change status + 2',
  createdAt: new Date().toLocaleDateString(),
  status: true
}
]

export default function HomePage({ children }: any) {
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div className="absolute border-2 rounded-2xl w-11/12 h-5/6 flex justify-around pt-5 pb-5">
        <div className="flex w-56 bg-base-200 border-2 rounded-xl justify-center">
          <MenuComponent userName="Dev Backend" />
        </div>
        <div className="flex flex-col w-10/12 border-2 rounded-xl">
          <div className="w-auto flex justify-center m-4">
            <h1>Title</h1>
          </div>
          <span className="border-b-2 border-gray-500 mb-4"></span>
          {/* <MainContent /> */}
        </div>
      </div>
    </div>
  )
}

function MainContent() {
  const pending = false
  const completed = true
  const emptyData = {
    id: '',
    description: '',
    title: '',
    status: false,
  }
  const [currentModalData, setCurrentModalData] = useState<DataModal>(emptyData)

  const [list, setList] = useState(listData)
  const onChangeCheckBox = (id: string) => {
    return (e: any) => {
      const { checked } = e.target

      const n = list.map(item => {
        if (item.id != id) return item
        return {
          ...item,
          status: checked
        }
      })
      setList(n)
    }
  }

  const openModal = (item: DataModal) => {
    document?.getElementById('modal_edit')?.showModal()
    setCurrentModalData(item);
  }

  const onChange = (e: any) => {
    const key = e.target.name
    const value = e.target.value
    setCurrentModalData({ ...currentModalData, [key]: value })
  }

  const onSubmit = (e: any) => {
    if (!currentModalData.id) {
      currentModalData.id = Date.now().toString()
      setList([...list, {
        ...currentModalData,
        createdAt: new Date().toLocaleDateString(),
        status: false
      }])
    } else {
      const n = list.map(item => {
        if (item.id != currentModalData.id) return item
        return {
          ...item,
          ...currentModalData
        }
      })
      setList(n)
    }
  }

  const onDelete = (id: string) => {
    return (e: any) => {
      const n = list.filter(item => item.id != id)
      setList(n)
    }
  }

  return (
    <div className="flex flex-col w-10/12 border-2 rounded-xl">
      <div className="w-auto flex justify-center m-4">
        <h1>Title</h1>
      </div>
      <span className="border-b-2 border-gray-500 mb-4"></span>
      <div className="w-full h-screen flex flex-col">
        <div className="w-auto h-1/2">
          <div className="w-full flex flex-row mb-3 items-center justify-end border-b-2 border-y-gray-600">
            <div className="w-2/5 flex justify-start mr-5">
              <h2>Tasks Pending</h2>
            </div>
            <div className="flex justify-end pb-1">
              <button className="btn" onClick={() => openModal(emptyData)}>
                + Adicionar
              </button>
            </div>
          </div>
          <TableContentTask data={list.filter(item => item.status == pending)}
            openModal={openModal}
            onChangeCheckBox={onChangeCheckBox}
            onDelete={onDelete}
          />
        </div>
        <div className="w-auto h-1/2">
          <h2 className="flex justify-center mb-3 border-y-gray-600"> Tasks Completed</h2>
          <TableContentTask data={list.filter(item => item.status == completed)}
            openModal={openModal}
            onChangeCheckBox={onChangeCheckBox}
            onDelete={onDelete}
          />
        </div>
      </div>
      <Modal item={currentModalData} onSubmit={onSubmit} onChange={onChange} />
    </div>
  )
}

function TableContentTask({ data, openModal, onChangeCheckBox, onDelete }: PropTable) {
  return (
    <>
      <div className="overflow-x">
        <table className="table table-xl table-pin-rows table-pin-cols">
          <thead className="">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Details</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((value, index) => {
                return (
                  <tr key={value.id}>
                    <th>{value.title}</th>
                    <th>{value.description}</th>
                    <th>{value.createdAt}</th>
                    <th>
                      <button className="relative w-12 max-w-[40px] h-12 max-h-[40px] rounded-lg hover:shadow-xl"
                        type="button"
                        onClick={() => openModal(value)} >
                        <span className="absolute transform -translate-x-2/4 -translate-y-2/4 top-2/4 left-2/4">
                          <Image priority src={editIcon} alt="Edit" />
                        </span>
                      </button>
                    </th>
                    <th>
                      <span className="flex">
                        <input type="checkbox" className="toggle toggle-success ml-2" defaultChecked={value.status} name="status" onChange={onChangeCheckBox(value.id)} />
                      </span>
                    </th>
                    <th>
                      <button className="relative w-10 max-w-[30px] h-10 max-h-[30px] rounded-lg hover:shadow-xl"
                        type="button" onClick={onDelete(value.id)}>
                        <span className="absolute top-0 left-0 h-6 w-6">
                          <Image priority src={trashIcon} alt="trash" />
                        </span>
                      </button>
                    </th>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div >
    </>
  )
}

function Modal({ item, onSubmit, onChange }: any) {
  return (
    <dialog id="modal_edit" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <div className="modal-action mt-0">
          <form method="dialog" className="w-full">
            <div>

              <label className="input input-bordered flex items-center">
                <input type="text" name="title" className="grow" placeholder="title" value={item.title} onChange={onChange} />
              </label>
              <textarea className="w-full textarea textarea-bordered mt-4" name="description" placeholder="Description" value={item.description} onChange={onChange} />
            </div>
            <div className="flex w-full justify-around mt-4">
              <button className="btn w-40" onClick={onSubmit}>Save</button>
              <button className="btn w-40">Close</button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  )
}
