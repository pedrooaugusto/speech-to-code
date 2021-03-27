declare module 'graphlib-dot' {
	type Graph = {
		graph: () => Record<string, string>
	}

	const graphlib1: {
		read: (dotFile: string) => Graph,
		graphlib: {
			json: {
				read: (str: string) => any,
				write: (obj: Record<string, unknown>) => any
			}
		}
	}

	export default graphlib1
}

declare type ParsedPhrase = {
    phrase: string
}

declare type GraphJsonView = Record<string, unknown>

declare type GrammarCollection = {
    langs: Record<string, GraphJsonView[]>
}

declare type Editor = {
    write(text: string): Promise<void | Error>
	removeSelection(): Promise<string | Error>
	newLine(): Promise<void | Error>
	removeLine(): Promise<string | Error>
	selectLines(from: number | undefined, to: number | undefined): Promise<string | Error>
	goToLine(number: string): Promise<string | Error>
    hotKey(...keys: string[]): Promise<void | Error>
} & {
    [value: string]: (...args: any[]) => Promise<unknown | Error>
}
