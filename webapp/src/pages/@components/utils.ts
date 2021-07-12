export function isRoute(guess: string) {
	const { pathname } = window.location

	return new RegExp('^/' + guess + '(/|)$').test(pathname)
}
