import React from 'react'
import Draggable from 'react-draggable'
import '../services/ipc-service-emulator'
import useVoiceRecognition from '../../../services/chrome/use-voice-recognition'
import { GlobalContext } from '../services/global-context'
import { factory as AppFactory } from '../../app'
import './style.scss'

const App = AppFactory(useVoiceRecognition)

export default React.memo(function Editor() {
    const { language } = React.useContext(GlobalContext)

    return (
        <Draggable
            axis="both"
            handle=".handle"
            cancel=".control"
            defaultPosition={{x: -50, y: -50}}
        >
            <div className="speech2code-wrapper">
                <div className="window">
                    <div className="handle top-bar">
                        <div className="window-title">Speech2Code</div>
                        <div className="controls">
                            <div className="control"><i className="fa fa-window-close"/></div>
                        </div>
                    </div>
                    <div className="window-content">
                        {/* <App initialLang={language} /> */}
                    </div>
                </div>
            </div>
        </Draggable>
    )
})