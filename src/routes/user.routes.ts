// biome-ignore lint/style/useImportType: <explanation>
import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/user.usecase";
// biome-ignore lint/style/useImportType: <explanation>
import { CreateUser } from "../interfaces/user.interface";

export async function userRoutes(fastify: FastifyInstance) {
	const userUseCase = new UserUseCase();
	fastify.post<{ Body: CreateUser }>("/createUser", async (req, replay) => {
		const { email, name } = req.body;
		try {
			const data = await userUseCase.create({
				email,
				name,
			});
			return replay.send(data);
		} catch (error) {
			replay.send(error);
		}
	});
	fastify.get("/", (req, replay) => {
		return replay.send({ message: "User created." });
	});
}
