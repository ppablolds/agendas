// biome-ignore lint/style/useImportType: <explanation>
import fastify, { FastifyInstance } from "fastify";

const app: FastifyInstance = fastify({ logger: true });

app.listen(
	{
		port: 3001,
	},
	() => console.log("Server is running in port 3001"),
);
