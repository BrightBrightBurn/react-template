import React, {CSSProperties, useState} from 'react'

type MessageComponent = (() => React.ReactNode) | React.ReactNode;

interface MessageOptions {
    disableBackdropClose: boolean;
    backdropOpacity: number;
}

const defaultOptions: MessageOptions = {
    disableBackdropClose: false,
    backdropOpacity: 0.4
}

type ShowMessageAction = (message: MessageComponent, options?: Partial<MessageOptions>) => void;

interface MessagesActions {
    showMessage: ShowMessageAction;
    hideMessage: () => void;
}

const NotImplemented = () => console.error('Messages actions not implemented')

const defaultContext: MessagesActions = {
    showMessage: NotImplemented,
    hideMessage: NotImplemented
}

export const MessagesContext = React.createContext<MessagesActions>(defaultContext)

export const MessagesContainer: React.FC = (props) => {
    const [message, setMessage] = useState<React.ReactNode>(null)
    const [options, setOptions] = useState<MessageOptions>(defaultOptions)

    const showMessage: ShowMessageAction = (component, opts = {}) => {
        if (typeof component === 'function') {
            setMessage(component())
        } else {
            setMessage(component)
        }
        setOptions(() => ({...options, ...opts}))
    }

    const hideMessage = () => {
        setMessage(null)
        setOptions(defaultOptions)
    }

    const backdropClick = () => {
        if (!options.disableBackdropClose) {
            hideMessage()
        }
    }

    return (
        <MessagesContext.Provider value={{showMessage, hideMessage}}>
            <div style={{height: '100%'}}>
                {message &&
                    <div
                        onClick={backdropClick}
                        style={backDropStyle(options)}
                    >
                        <div style={dialogCenter} onClick={(event) => event.stopPropagation()}>
                            {message}
                        </div>
                    </div>
                }
                {props.children}
            </div>
        </MessagesContext.Provider>
    )
}

const backDropStyle = (options: MessageOptions): CSSProperties => ({
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: `rgba(69, 87, 95, ${options.backdropOpacity})`
})

const dialogCenter: CSSProperties = {
    width: 'fit-content',
    height: 'fit-content',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto'
}
