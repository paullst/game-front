export class Country {
    id: string;
    name: string;
    value: number;
    fill: any;
    owner: string;

    constructor(
        id: string,
        name: string,
        value: number,
        fill: any,
        owner: string
    ) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.fill = fill;
        this.owner = owner;
    }
}