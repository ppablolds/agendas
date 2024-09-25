export interface Contact {
	id: string;
	name: string;
	email: string;
	phone: string;
	userId?: string;
}

export interface CreateContact {
	name: string;
	email: string;
	phone: string;
	userEmail: string;
}

export interface CreateContactData {
	name: string;
	email: string;
	phone: string;
	userId: string;
}

export interface ContactRepository {
		create(data: CreateContactData): Promise<Contact>;
		findByEmailOrPhone(email: string, phone: string): Promise<Contact | null>;
		findAllContacts(userId: string): Promise<Contact[]>;
		updateContact({ id, email, name, phone }: Contact): Promise<Contact>;
		deleteContact(id: string): Promise<boolean>
	}
