import Navbar from "../components/Navbar/Navbar";
import ChatBottom from "../components/Chat/ChatBottom";
import { useRef, useState, useEffect } from "react";
import { addDoc, Timestamp, collection, orderBy, query, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase";
import ChatMessage from "../components/Chat/ChatMessage";
import { FaExclamationTriangle } from "react-icons/fa";

const GroupChat = () => {
    const msgRef = useRef(null);
    const [message, setMessage] = useState(null);
    const [msglist, setMsglist] = useState(null);

    //getAllMsg
    useEffect(() => {
        let mount = true;
        const collectionRef = collection(db, 'groupchat')
        const q = query(collectionRef, orderBy("createdAt", "asc"))
        onSnapshot(q, (snapshot) => {
            if (!snapshot.empty) {
                const msg = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
                if (mount) {
                    setMsglist(msg);
                }
            }
        })

        return () => {
            mount = false;
        }
    }, [])

    //send msg function
    const sendMsg = () => {
        if (message === '') {
            return;
        } else {
            setMessage('')
            const collectionRef = collection(db, "groupchat")
            addDoc(collectionRef, { createdAt: Timestamp.now().toMillis(), msgbody: message, sender: auth.currentUser.email })
                .catch(e => console.log(e))
        }
    }

    //onsumbit fun
    const sendSubmit = (e) => {
        e.preventDefault()
        sendMsg();
    }

    //onclick fun
    const sendClick = (e) => {
        e.preventDefault();
        sendMsg();
    }

    //onchange fun
    const msgOnChange = () => {
        setMessage(msgRef.current.value)
    }

    return (
        <>
            <Navbar withauth={true} backtofeed={true} gpchat={true} navfixed={true} />
            <div className="dark:bg-slate-800">
                <div className="container bg-white dark:bg-slate-700 mx-auto max-w-3xl pt-20 pb-20 min-h-screen h-full">
                    <h1 className="text-center dark:text-slate-300 text-3xl px-2 py-5 font-semibold">
                        Welcome <span className="text-gray-700 dark:text-slate-400">test@gmail.com</span>
                    </h1>
                    <h2 className="text-center dark:text-slate-500 px-1 text-xl font-semibold text-gray-800">
                        This is public chat room
                </h2>
                    <div className="text-red-500 dark:text-pink-600 py-2 px-1 text-lg flex items-center justify-center">
                        <FaExclamationTriangle size={20} />
                        <h3 className="pl-1">Spamming is not allowed</h3>
                    </div>
                    {msglist === null ?
                        <div>Loading..</div> :
                        msglist.map((val, key) => {
                            return (
                                <ChatMessage message={val.msgbody} key={key} sender={val.sender} />
                            )
                        })
                    }
                </div>
                <ChatBottom onsubmit={sendSubmit} onclick={sendClick} onchange={msgOnChange} msgref={msgRef} msgvalue={message} />
            </div>
        </>
    )
}

export default GroupChat
