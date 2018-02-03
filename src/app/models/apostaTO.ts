export class ApostaTO {
    id: number;
    usuario_id: number;
    rodada_id: number;
    tipo: string;
    times: any[];
    constructor() {
        this.times = [];
        this.tipo = '';
    }
}
