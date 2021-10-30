import React, { ComponentType } from 'react'
import ReactDOM from 'react-dom'
import { parseRoute } from './pages/@components/utils'
const App = React.lazy(() => import('./pages/app'))
const WebApp = React.lazy(() => import('./pages/webapp'))
const About = React.lazy(() => import('./pages/about'))

declare global {
	interface Window {
		electronShellInfo: any
		__HOME_PAGE__: string
	}
}

window.__HOME_PAGE__ = process.env.PUBLIC_URL

const OuterRouter = (props: any) => {
	const { lang, route } = parseRoute()

	let Page = null

	if (route === 'app') Page = App
	else if (route === 'webapp') Page = WebApp
	else if (route === 'about') Page = About
	else if (route === 'index') Page = lazy(UnderConstruction)
	else Page = lazy(NotFound)

	return (
		<React.Suspense fallback={<h1>Wait</h1>}>
			<Page lang={lang}/>
		</React.Suspense>
	)
}

const lazy = (comp: ComponentType) => React.lazy(() => Promise.resolve({ default: comp }))

const NotFound: ComponentType<any> = () => {
	return <h3>Error 404 - Cannot get {window.location.pathname}</h3>
}

const UnderConstruction: ComponentType<any> = () => {
	return (
		<React.Fragment>
			<h3><a href="webapp">Go to demo page</a></h3>
			<h3>🚧 Under construction 🚧 - Later!</h3>
		</React.Fragment>
	)
}

ReactDOM.render(
	<React.StrictMode>
		<OuterRouter />
	</React.StrictMode>,
	document.getElementById('root')
)
