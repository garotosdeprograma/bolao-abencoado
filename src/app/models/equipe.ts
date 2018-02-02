export class Equipe {
    id: number;
    nome: string;
    estado: string;
    cidade: string;
    estadio: string;
    logo: string;
    campeonato: number[];

    constructor() {
        this.nome = '';
        this.estadio = '';
        this.estado = '';
        this.cidade = '';
        this.logo = '';
        this.campeonato = [];
    }
}
