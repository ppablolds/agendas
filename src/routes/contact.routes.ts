// biome-ignore lint/style/useImportType: <explanation>
import { FastifyInstance } from "fastify";
import { ContactUserCase } from "../usecases/contact.usecase";
// biome-ignore lint/style/useImportType: <explanation>
import { CreateContact } from "../interfaces/contact.interface";
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
            return replay.send(data)
        } catch (error) {
            replay.send(error)
        }
    })
}
