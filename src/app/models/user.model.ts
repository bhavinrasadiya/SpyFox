export class User {
    mobile: number;
    fullName: string;
    password: string;
    history: Array<History>;
}
export class History {
    photoURL: string;
    createdAt: string;
}
