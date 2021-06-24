import React, { ComponentType } from 'react'
import ReactDOM from 'react-dom'
const App = React.lazy(() => import('./App'))

declare global {
	interface Window {
		electronShellInfo: any
	}
}

const OuterRouter = (props: any) => {
	let Page = null

	if (isRoute('app')) Page = App
	else if (isRoute('') || isRoute('webapp')) Page = lazy(UnderConstruction)
	else Page = lazy(NotFound)

	return (
		<React.Suspense fallback={<h1>Wait</h1>}>
			<Page />
		</React.Suspense>
	)
}

const lazy = (comp: ComponentType) =>
	React.lazy(() => Promise.resolve({ default: comp }))

const NotFound: ComponentType<any> = () => {
	return <h3>Error 404 - Cannot get {window.location.pathname}</h3>
}

const UnderConstruction: ComponentType<any> = () => {
	return <h3>🚧 Under construction 🚧 - Later!</h3>
}

ReactDOM.render(
	<React.StrictMode>
		<OuterRouter />
	</React.StrictMode>,
	document.getElementById('root')
)

function isRoute(guess: string) {
	const { pathname } = window.location

	return new RegExp('^/' + guess + '(/|)$').test(pathname)
}
