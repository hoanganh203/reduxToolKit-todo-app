export interface ITodoList {
    [x: string]: any;
    id?: number;
    name: string;
    prioriry: string,
    completed?: boolean,
    startDate?: string,
    dueDate?: string,
    statusDate?: boolean
}