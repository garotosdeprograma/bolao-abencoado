export class Aposta {
    id: number;
    usuario_id: number;
    premio: number;
    rodada_id: number;
    aposta_pago: boolean;
    times: any[];
    constructor() {
        this.times = [];
    }
}
