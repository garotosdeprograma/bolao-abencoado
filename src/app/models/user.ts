export class User {
    public id: number;
    public nome: string;
    public sobrenome: string;
    public senha: string;
    public email: string;
    public password: string;

    constructor() {
        this.nome = '';
        this.sobrenome = '';
        this.password = '';
        this.email = '';
    }
}
