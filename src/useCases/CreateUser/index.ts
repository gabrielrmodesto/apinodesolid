import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { MailtrapMailProvider } from "./../../providers/implementations/MailtrapMailProvider";
import { PostgresUserRepository } from "./../../repositories/implementations/PostgresUserRespository";

const postgresUsersRepository = new PostgresUserRepository();
const mailtrapMailProvider = new MailtrapMailProvider();

const createUserUseCase = new CreateUserUseCase(
	postgresUsersRepository,
	mailtrapMailProvider
);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
