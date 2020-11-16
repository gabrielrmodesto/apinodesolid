import { IMailProvider } from './../../providers/IMailProvider';
import { User } from './../../entities/User';
import { IUsersRepository } from './../../repositories/IUsersRepository';
import { ICreateUserDTO } from './CreateUserDTO';
export class CreateUserUseCase{
	constructor(
		private userRepository: IUsersRepository,
		private mailProvider: IMailProvider,
	){}
	async execute(data: ICreateUserDTO){
		const userAlreadyExists = await this.userRepository.findByEmail(data.email);

		if(userAlreadyExists){
			throw new Error('User already exists.');
		}

		const user = new User(data);

		await this.userRepository.save(user);

		await this.mailProvider.sendMail({
			to:{
				name: data.name,
				email: data.email,
			},
			from:{
				name: "Equipe do produto",
				email: "equipe@produto.com"
			},
			subject: 'Seja bem vindo',
			body: '<p>Pode realizar o login</p>'
		})
	}
}
