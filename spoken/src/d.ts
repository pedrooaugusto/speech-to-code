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
