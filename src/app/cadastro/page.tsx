import prisma from "../lib/db";
import CadastroComponente from "./ComponentCadastro";

export default async function Cadastro (){
const users = await prisma.user.findMany()
const postCount = await prisma.user.count()
  return(
    <div>
      <CadastroComponente />
      {users.map((user) =>(
          <li key={user.id} className="flex items-center justify-between px-5" >
            <p>{user.email}</p>
            <p>{user.senha}</p>
            <p>{postCount}</p>

          </li>
      ))} 
    </div>

  )

  
}