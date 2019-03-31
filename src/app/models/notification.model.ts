export class Notification {
    code: number;
    message: string;
    type: string;

    constructor(code: number, message: string, type: string) {
        this.code = code;
        this.message = message;
        this.type = type;
    }
}