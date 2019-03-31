export class Move {
    from: string;
    to: string;
    player: string;
    pop: number;

    constructor(
        from: string,
        to: string,
        player: string,
        pop: number
    ) {
        this.from = from;
        this.to = to;
        this.player = player;
        this.pop = pop;
    }
}