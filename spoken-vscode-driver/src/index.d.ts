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

export interface Robot {
    write(text: string): Promise<void | Error>
	removeSelection(): Promise<string | Error>
	newLine(pos: 0 | 1): Promise<void | Error>
	removeLine(): Promise<string | Error>
	selectLines(from: number | undefined, to: number | undefined): Promise<string | Error>
	goToLine(number: string): Promise<string | Error>
    hotKey(...keys: string[]): Promise<void | Error>
}