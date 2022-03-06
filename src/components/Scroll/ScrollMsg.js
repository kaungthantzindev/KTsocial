import { FaFacebookMessenger } from "react-icons/fa"
import { useState, useRef } from "react"
import ModalItem from "../Modal/ModalItem";

const ScrollMsg = () => {

    const [openmsg, setOpenmsg] = useState(false);
    const textref = useRef(null);
    const [text, setText] = useState(null);

    const openMsgHandle = (e) => {
        e.preventDefault();
        setOpenmsg(!openmsg)
    }

    const textonchange = () => {
        setText(textref.current.value)
    }

    return (
        <>
            <div onClick={openMsgHandle} className="fixed bottom-28 right-10 lg:cursor-pointer md:cursor-pointer ring-yellow-400 active:bg-yellow-600 p-3 shadow-lg rounded-full ring-2 ring-offset-2 bg-yellow-400">
                <FaFacebookMessenger size={20} />
            </div>
            {openmsg && (
                <>
                    <div>
                        <ModalItem messenger={true} title="Go to chat room" content="Enter Id or Email to chat or Go to Group chat" textref={textref} textonchange={textonchange} text={text} close={openMsgHandle} />
                    </div>
                </>
            )}
        </>
    )
}

export default ScrollMsg
