// biome-ignore lint/style/useImportType: <explanation>
import {
	Contact,
	ContactRepository,
	CreateContact,
} from "../interfaces/contact.interface";
import { ContactRepositoryPrisma } from "../repositories/contact.repository";
import { UserRepositoryPrisma } from "../repositories/user.repository";

export class ContactUserCase {
	private contactRepository: ContactRepository;
	private userRepository: UserRepositoryPrisma;
	constructor() {
		this.contactRepository = new ContactRepositoryPrisma();
		this.userRepository = new UserRepositoryPrisma();
	}

	async create({ email, name, phone, userEmail }: CreateContact) {
		//email do usuario logado
		//buscar usuario pelo email
		//se não existir, retornar erro
		//se existir, criar o contato
		//antes de criar o contato, verificar se o contato ja existe pelo telefone ou email

		const user = await this.userRepository.findByEmail(userEmail);

		if (!user) {
			throw new Error("User not found");
		}

		const verifyExistContact = await this.contactRepository.findByEmailOrPhone(
			email,
			phone,
		);

		if (verifyExistContact) {
			throw new Error("Contact already exist");
		}

		const contact = await this.contactRepository.create({
			email,
			name,
			phone,
			userId: user.id,
		});
		return contact;
	}

	async listAllContact(userEmail: string) {
		const user = await this.userRepository.findByEmail(userEmail);

		if (!user) {
			throw new Error("User not found");
		}

		const contacts = await this.contactRepository.findAllContacts(user.id);

		return contacts;
	}

	async updateContact({ id, email, name, phone }: Contact) {
		const data = await this.contactRepository.updateContact({
			id,
			email,
			name,
			phone,
		});
		return data;
	}
}
