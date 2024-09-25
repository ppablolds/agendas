import { prisma } from "../database/prisma-client";
// biome-ignore lint/style/useImportType: <explanation>
import {
	Contact,
	ContactRepository,
	CreateContact,
	CreateContactData,
} from "../interfaces/contact.interface";

export class ContactRepositoryPrisma implements ContactRepository {
	async create(data: CreateContactData): Promise<Contact> {
		const result = await prisma.contacts.create({
			data: {
				email: data.email,
				name: data.name,
				phone: data.phone,
				userId: data.userId,
			},
		});
		return result;
	}
	async findByEmailOrPhone(
		email: string,
		phone: string,
	): Promise<Contact | null> {
		const result = await prisma.contacts.findFirst({
			where: {
				OR: [{ email }, { phone }],
			},
		});
		return result || null;
	}

	async findAllContacts(userId: string): Promise<Contact[]> {
		const result = await prisma.contacts.findMany({
			where: {
				userId,
			},
		});
		return result;
	}
	async updateContact({ id, email, name, phone }: Contact): Promise<Contact> {
		const result = await prisma.contacts.update({
			where: {
				id,
			},
			data: {
				email,
				name,
				phone,
			},
		});
		return result;
	}
}
