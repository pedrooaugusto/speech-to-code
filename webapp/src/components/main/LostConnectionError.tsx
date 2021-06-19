import React from 'react'
import Modal from '../Modal'
import { GlobalContext } from '../../services/global-context'

export default function LostConnectionError() {
	const context = React.useContext(GlobalContext)

	if (context.connectedToVSCode) return null

    return (
		<React.Fragment>
			<div className="panel error" onClick={() => context.toggleShade()} title="Click for more information">
				<div>{i18n(context.language)('no-connection-1')()}</div>
			</div>
			<Modal isOpen={context.shadeIsOpen}>
				<div className="modal-content lost-connection">
					<div className="wrapper">
						<div className="main-header">
							<h2>{i18n(context.language)('no-connection-2')()}</h2>
							<div>{i18n(context.language)('no-connection-sub')()}</div>
						</div>
						<div className="divider"></div>
						<div className="body">
							{i18n(context.language)('no-connection-reason')()}
						</div>
					</div>
				</div>
			</Modal>
		</React.Fragment>
    )
}

const SpokenLink = () => (
	<a
		rel="noreferrer"
		href="https://github.com/pedrooaugusto/speech-to-code/tree/main/spoken-vscode-driver"
		target="_blank"
	>
		Spoken
	</a>
)

const texts: Record<string, Record<string, any>> = {
    'en-US': {
		'no-connection-1': () => 'Could not connect to Visual Studio Code!',
		'no-connection-2': () => "Couldn't connect to VSCode",
		'no-connection-sub': () => 'Speech2Code depends on a connection with Visual Studio Code',
		'no-connection-reason': () => (
			<React.Fragment>
				<div className="label">Could not connect to Visual Studio Code, possible reasons include:</div>
				<ul>
					<li>Visual Studio Code is not installed.</li>
					<li>
						<SpokenLink />, a required VSCode extension is not installed.
						Speech2Code tries to automatically install this extension.
					</li>
					<li>
						Visual Studio Code is not running. You first should open VSCode and then open
						this application (in that sequence!).
					</li>
				</ul>
			</React.Fragment>
		)
    },
    'pt-BR': {
		'no-connection-1': () => 'Erro ao conectar-se com o Visual Studio Code!',
		'no-connection-2': () => "Falha ao conectar-se com o VSCode",
		'no-connection-sub': () => 'Speech2Code depende de uma conexão com o Visual Studio Code',
		'no-connection-reason': () => (
			<React.Fragment>
				<div className="label">Falha ao conectar-se com o Visual Studio Code, possíveis razões incluem:</div>
				<ul>
					<li>Visual Studio Code não esta instalado.</li>
					<li>
						<SpokenLink />, uma extensão do VSCode obrigatória para o uso
						desse programa não esta instalada. Speech2Code tenta instalar essa extensão automaticamente.
					</li>
					<li>
						O Visual Studio Code não esta aberto. Você deve primeiro abrir o VSCode e então abrir
						este programa (nessa sequência!).
					</li>
				</ul>
			</React.Fragment>
		)
    }
}

const i18n = (lang: string) => (textId: string) => texts[lang][textId]