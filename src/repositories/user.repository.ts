import { prisma } from "../database/prisma-client";
// biome-ignore lint/style/useImportType: <explanation>
import { CreateUser, User, UserRepository } from "../interfaces/user.interface";

export class UserRepositoryPrisma implements UserRepository {
	async create(data: CreateUser): Promise<User> {
		const result = await prisma.user.create({
			data: {
				name: data.name,
				email: data.email,
			},
		});
		return result;
	}
	async findByEmail(email: string): Promise<User | null> {
		const result = await prisma.user.findFirst({
			where: {
				email,
			},
		});
		return result || null;
	}
}
