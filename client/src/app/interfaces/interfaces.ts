export interface Employee {
    id: number;
    username: string;
    email: string;
    profile?: any;
    address: string;
    phone: string;
    dob: Date;
    role?: any;
}

export interface Position {
    value: number;
    label: string;
}