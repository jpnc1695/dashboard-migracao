import DashboardPage from "./DashBoard";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";


export default async function DashBoad() {
     const session = await getServerSession()
      console.log(session?.user)

   if(!session){
    redirect("/") 
  }

  return (
    <DashboardPage/>
  );
}

