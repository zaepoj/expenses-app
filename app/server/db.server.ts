import { PrismaClient, User } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;


type StoreUserType = Pick<User, "email" | "name" | "uid">;

const storeUser = async (user: StoreUserType) => {
  return prisma.user.create({ data: user });
};

const getUser = async (uid: string) => {
  return prisma.user.findFirst({ where: { uid } });
};


export { storeUser, getUser };
