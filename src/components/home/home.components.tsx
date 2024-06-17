import MenuComponent from "./menu.component";

export default function HomeComponent({ children }: any) {
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div className="absolute border-2 rounded-2xl w-11/12 h-5/6 flex justify-around pt-5 pb-5">
        <div className="flex w-56 bg-base-200 border-2 rounded-xl justify-center">
          <MenuComponent userName="Dev Backend" />
        </div>
        <div className="flex flex-col w-10/12 border-2 rounded-xl">
          {children}
        </div>
      </div>
    </div>
  )
}