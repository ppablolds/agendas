// biome-ignore lint/style/useImportType: <explanation>
import { FastifyReply, FastifyRequest } from "fastify";

export async function authMiddleware(
	req: FastifyRequest,
	replay: FastifyReply,
) {
	// biome-ignore lint/complexity/useLiteralKeys: <explanation>
	const apiEmail = req.headers["email"];

	if (!apiEmail) {
		return replay.code(401).send({ message: "Unauthorized" });
	}
}
