declare module 'graphlib-dot' {
	type Graph = {
		graph: () => Record<string, string>,
	} & any

	const graphlib1: {
		read: (dotFile: string) => Graph,
		graphlib: {
			json: {
				read: (str: string) => any,
				write: (obj: Record<string, unknown>) => any
			},
			alg: any
		}
	}

	export default graphlib1
}

declare type ParsedPhrase = {
    phrase: string
}

declare type GraphJsonView = Record<string, unknown>

declare type SpokenModules = {
	modules: SpokenModule[],
	normalizers: Record<string, (((lang: string) => Function))>,
	templates: Record<string, {
		value: string,
		examples: Record<string, string[]>
	}>,
	stopWords: Record<string, {
		words: string[],
		expressions: string[]
	}>
}

declare type SpokenModule = {
	id: string,
	desc: string,
	label: string,
	grammar: Record<string, GraphJsonView[]>
}

enum PositionEnum {
    ABOVE = 0,
    BELOW = 1
}

declare type Editor = {
    write(text: string): Promise<void | Error>
	removeSelection(): Promise<string | Error>
	newLine(pos: PositionEnum): Promise<void | Error>
	removeLine(): Promise<string | Error>
	selectLines(from: number | undefined, to: number | undefined): Promise<string | Error>
	goToLine(number: string, cursorPosition?: 'END' | 'BEGIN'): Promise<string | Error>
    hotKey(...keys: string[]): Promise<void | Error>,
	moveCursorTo(
        to: 'END_LINE' | 'BEGIN_LINE' | 'SYMBOL' | null,
        symbol?: string | undefined,
        leapSize?: number | undefined,
        goto?: boolean
    ): Promise<number | Error>,
	select(from: number, to: number, line: boolean): Promise<string | Error>
} & {
    [value: string]: (...args: any[]) => Promise<unknown | Error>
}
