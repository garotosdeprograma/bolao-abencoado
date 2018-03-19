export class ApostaTO {
    id: number;
    rodada_id: number;
    nome: string;
    tipo: string;
    telefone: number;
    times: any[];
    constructor() {
        this.times = [];
        this.tipo = '';
        this.nome = '';
    }
}
