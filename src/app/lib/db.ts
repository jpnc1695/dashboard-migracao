import {PrismaClient} from "@prisma/client";

const primaCLientSingleton = () => {
    return new PrismaClient();
}

declare const globalThis:{
    prismaGlobal: ReturnType<typeof primaCLientSingleton>;

} & typeof global;

const prisma = globalThis.prismaGlobal ?? primaCLientSingleton();

export default prisma;

if(process.env.NODE_ENV !== "production") globalThis.
prismaGlobal = prisma;