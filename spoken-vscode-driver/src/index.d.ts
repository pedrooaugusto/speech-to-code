import { Socket } from 'net';

export interface Proxy {
    proxy: (request: TaskRequest, socket: Socket) => Promise<void>
}

export type TaskRequest = {
    type: string;
    context: object;
    extra: { [key: string]: any};
    id: number;
}