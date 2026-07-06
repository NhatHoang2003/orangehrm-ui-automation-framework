export class DataFactory {

    static generateUsername(): string {

        return `user_${Math.random().toString(36).slice(2, 7)}`;
    }
}

