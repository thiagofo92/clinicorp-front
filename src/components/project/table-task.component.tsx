import Image from "next/image"
import editIcon from '@/assets/bullet-list-svgrepo-com.svg'
import trashIcon from '@/assets/trash-svgrepo-com.svg'

interface PropTable {
  input: TaskData[]
  openModal: (input: TaskData) => void
  onChangeCheckBox: (index: string) => (e: any) => void
  onDelete: (index: string) => (e: any) => void
}

export interface TaskData {
  id: string,
  title: string,
  description: string,
  createdAt: string,
  status: boolean
}

export function TableContentTask({ input: data, openModal, onChangeCheckBox, onDelete }: PropTable) {
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