export interface User {
	id: string;
	email: string;
	name: string;
}

export interface CreateUser {
	email: string;
	name: string;
}

export interface UserRepository {
	create(data: CreateUser): Promise<User>;
	findByEmail(email: string): Promise<User | null>;
}
