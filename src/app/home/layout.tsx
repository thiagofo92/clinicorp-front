import HomeComponent from "@/components/home/home.components";

export default function Layout({ children }: any) {
  return (
    <>
      <HomeComponent >
        {children}
      </HomeComponent>
    </>
  )
}