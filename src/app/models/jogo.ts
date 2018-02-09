export class Jogo {
    id: number;
    rodada_id: number;
    campeonato_id: number;
    equipe_visitante: number;
    equipe_casa: number;
    estadio: string;
    gol_casa: number;
    gol_visitante: number;
    inicio: string;

    constructor() {
        this.estadio = '';
        this.equipe_casa = undefined;
        this.equipe_visitante = undefined;
    }
}
