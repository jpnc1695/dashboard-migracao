import { getServerSession } from "next-auth";
import {authOptionsCredential}  from "./auth"


export async function getCurrentUser(){
    const session = await getServerSession(authOptionsCredential)
    return session?.user
}