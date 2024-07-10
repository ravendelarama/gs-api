import type { User } from "@prisma/client";
import db from "../../utils/db";

interface UserCreateType {
    name: string;
    email: string;
}

interface UserType {
    name?: string;
    email?: string;
}

type UserReturnType = Promise<User | null>
type UsersReturnType = Promise<User[] | null>

const user = {
    /**
     * Creates a new user.
     * 
     * @param {UserCreateType} data 
     * @returns {UserReturnType}
     */
    async create(data: UserCreateType): UserReturnType {
        try {
            const result = await db.user.create({ data });
            return result;
        } catch {
            return null;
        }
    },

    async findById(id: number): UserReturnType {
        try {
            const result = await db.user.findFirst({
                where: {
                    id
                }
            });

            return result;
        } catch {
            return null;
        }
    },

    /**
     * Finds a user by email.
     * 
     * @param {UserType} filter 
     * @returns {UserReturnType}
     */
    async findByEmail(email: string): UserReturnType {
        try {
            const result = await db.user.findUnique({
                where: {
                    email
                }
            });

            return result;
        } catch {
            return null;
        }
    },

    /**
     * Gets many users.
     * 
     * @param {UserType} filter 
     * @param {number | undefined} skip 
     * @param {number | undefined} take 
     * @returns 
     */
    async findMany(filter?: UserType, skip?: number, take?: number): UsersReturnType {
        try {
            const result = await db.user.findMany({
                where: {
                    ...filter
                },
                skip: skip ?? 0,
                take: take ?? 10
            });

            return result;
        } catch {
            return null;
        }
    }
}

export default user;