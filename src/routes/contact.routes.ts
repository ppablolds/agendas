// biome-ignore lint/style/useImportType: <explanation>
import { FastifyInstance } from "fastify";
import { ContactUserCase } from "../usecases/contact.usecase";
// biome-ignore lint/style/useImportType: <explanation>
import { Contact, CreateContact } from "../interfaces/contact.interface";
import { authMiddleware } from "../middlewares/auth.middleware";

export async function contactRoutes(fastify: FastifyInstance) {
	const contactUseCase = new ContactUserCase();
	fastify.addHook("preHandler", authMiddleware);
	fastify.post<{ Body: CreateContact }>("/", async (req, replay) => {
		const { email, name, phone } = req.body;
		// biome-ignore lint/complexity/useLiteralKeys: <explanation>
		const emailUser = req.headers["email"];
		try {
			const data = await contactUseCase.create({
				email,
				name,
				phone,
				userEmail: emailUser,
			});
			return replay.send(data);
		} catch (error) {
			replay.send(error);
		}
	});
	fastify.get("/", async (req, replay) => {
		// biome-ignore lint/complexity/useLiteralKeys: <explanation>
		const emailUser = req.headers["email"];
		try {
			const data = await contactUseCase.listAllContact(emailUser);
			return replay.send(data);
		} catch (error) {
			replay.send(error);
		}
	});
	fastify.put<{ Body: Contact; Params: { id: string } }>(
		"/:id",
		async (req, replay) => {
			const { id } = req.params;
			const { email, name, phone } = req.body;

			try {
				const result = await contactUseCase.updateContact({
					id,
					email,
					name,
					phone,
				});
				return result;
			} catch (error) {
				replay.send(error);
			}
		},
	);
	fastify.delete<{Params: {id: string}}>("/:id", async (req, replay) => {
		const {id} = req.params;
		try {
			const data = await contactUseCase.deleteContact(id);
			return replay.send(data);
		} catch (error) {
			replay.send(error);
		}
	});
}
