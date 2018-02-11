export class ApostaTO {
    id: number;
    rodada_id: number;
    tipo: string;
    telefone: number;
    times: any[];
    constructor() {
        this.times = [];
        this.tipo = '';
    }
}
