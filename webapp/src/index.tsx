import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'

declare global {
	interface Window { electronShellInfo: any }
}

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
)
