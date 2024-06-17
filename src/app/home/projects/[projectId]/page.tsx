'use client'
import { TaskData, TableContentTask } from "@/components/project/table-task.component"
import { useState } from "react"

interface PropProject {
  params: {
    projectId: string
  }
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

export default function ProjectPage(prop: PropProject) {
  const pending = false
  const completed = true
  const emptyData = {
    id: '',
    description: '',
    title: '',
    status: false,
    createdAt: ''
  }
  const [currentModalData, setCurrentModalData] = useState<TaskData>(emptyData)
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

  const openModal = (item: TaskData) => {
    // @ts-ignore
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
    <>
      <div className="w-auto flex justify-center m-4">
        <h1>Title</h1>
      </div>
      <span className="border-b-2 border-gray-500 mb-4"></span>
      <div className="w-full h-screen flex flex-col">
        <div className="w-auto h-1/2">
          <div className="w-full flex flex-row mb-3 items-center justify-end border-b-2 border-y-gray-600">
            <div className="w-2/5 flex justify-start mr-14">
              <h2>Tasks Pending</h2>
            </div>
            <div className="flex justify-end pb-1">
              <button className="btn mr-5" onClick={() => openModal(emptyData)}>
                + Adicionar
              </button>
            </div>
          </div>
          <TableContentTask input={list.filter(item => item.status == pending)}
            openModal={openModal}
            onChangeCheckBox={onChangeCheckBox}
            onDelete={onDelete}
          />
        </div>
        <div className="w-auto h-1/2">
          <h2 className="flex justify-center mb-3 border-y-gray-600"> Tasks Completed</h2>
          <TableContentTask input={list.filter(item => item.status == completed)}
            openModal={openModal}
            onChangeCheckBox={onChangeCheckBox}
            onDelete={onDelete}
          />
        </div>
      </div>
      <Modal item={currentModalData} onSubmit={onSubmit} onChange={onChange} />
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
