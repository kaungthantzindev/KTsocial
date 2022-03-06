import { auth } from "../../firebase"
import { useEffect, useRef } from "react"

const ChatMessage = (props) => {
    const scrollRef = useRef(null);
    const checksender = props.sender === auth.currentUser.email;

    useEffect(() => {
        scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }, [props.message])

    return (
        <>
            <div ref={scrollRef} className={`mx-3 my-2 flex items-center ${checksender ? 'justify-end' : 'justify-start'}`}>
                <div>
                    <h2 className={`py-3 text-xs text-gray-500 dark:text-slate-400  ${checksender ? 'text-right' : 'text-left'}`}>@{props.sender.slice(0,props.sender.indexOf('@'))}</h2>
                    <h1 className={`py-3 px-5 lg:max-w-lg max-w-sm text-md rounded-3xl shadow-lg ${checksender ? 'rounded-br-none text-gray-800 bg-yellow-300 dark:bg-amber-400 ' : 'rounded-bl-none bg-yellow-500 dark:bg-amber-500 text-gray-100'} ${props.sender === 'ktsocial@ktsocial.com' && 'bg-blue-500 dark:bg-cyan-500 text-gray-100'}`}>
                        {props.message}
                    </h1>
                </div>
            </div>
            {/* <div ref={scrollRef} className="flex flex-col p-3 max-w-3xl mx-auto">
                <div>
                    <div className={props.sender === auth.currentUser.email ? 'flex items-end justify-end' : 'flex items-end justify-start'}>
                        <div className="flex flex-col text-xl order-2 items-start">
                            <div>
                                <h4 className="text-xs text-gray-500 py-2">{props.sender}</h4>
                                <h1 className={`px-3 py-3 w-full rounded-2xl ${props.sender === auth.currentUser.email ? 'rounded-br-none bg-yellow-300 text-gray-800' : 'rounded-bl-none bg-yellow-500 text-gray-100'}`}>
                                    {props.message}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default ChatMessage
