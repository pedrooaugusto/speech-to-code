export function isRoute(guess: string) {
	const { pathname } = window.location

	return new RegExp('^/' + guess + '(/|)$').test(pathname)
}

const langs = [['en', 'en-US'], ['pt', 'pt-BR']]

export function parseRoute() {
	const paths = window.location.pathname.split('/').filter(item => item !== '')

	let root
	if(!langs.find(([ c ]) => c === paths[0])) {
		paths.splice(0, 0, langs[0][0])
		root = ''
	}

	const lang = langs.find(([ c ]) => c === paths[0]) || langs[0]
	const route = paths[1] || 'index'

	return { lang: lang[1], root: root ?? lang[0], route }
}
