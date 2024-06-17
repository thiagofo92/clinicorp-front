interface LoginProp {
  placeholder: string
  name: string
  type: string
}

export function InputForm(prop: LoginProp) {
  return (
    <label className="input input-bordered flex items-center mt-3">
      <input type={prop.type} name={prop.name} className="grow" placeholder={prop.placeholder} required />
    </label>
  )
}