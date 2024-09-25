// biome-ignore lint/style/useImportType: <explanation>
import { CreateUser, User, UserRepository } from "../interfaces/user.interface";
import { UserRepositoryPrisma } from "../repositories/user.repository";

export class UserUseCase {
	private userRepository: UserRepository;
	constructor() {
		this.userRepository = new UserRepositoryPrisma();
	}

	async create({ email, name }: CreateUser): Promise<User> {
		const verifyExistEmail = await this.userRepository.findByEmail(email);
		if (verifyExistEmail) {
			throw new Error("User already exist.");
		}
		const result = await this.userRepository.create({ email, name });

		return result;
	}
}
