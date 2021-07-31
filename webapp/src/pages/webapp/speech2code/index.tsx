import React from 'react'
import Draggable from 'react-draggable'
import './style.scss'

const useVoiceRecognition = require('../../../services/chrome/use-voice-recognition').default
const App = require('../../app').factory(useVoiceRecognition)

export default React.memo(function Editor() {

    React.useEffect(() => {

    }, [])

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
                        <App />
                    </div>
                </div>
            </div>
        </Draggable>
    )
})