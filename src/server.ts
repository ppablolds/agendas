// biome-ignore lint/style/useImportType: <explanation>
import fastify, { FastifyInstance } from "fastify";
import { userRoutes } from "./routes/user.routes";

const app: FastifyInstance = fastify();

app.register(userRoutes, {
	prefix: "/users"
});

app.listen(
	{
		port: 3001,
	},
	() => console.log("Server is running in port 3001"),
);
