import ChatMessage from '../components/Chat/ChatMessage';
import Navbar from '../components/Navbar/Navbar';
import { useParams } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, Timestamp, query, orderBy } from 'firebase/firestore';
import { db, auth } from '../firebase';
// import ChatNav from '../components/Chat/ChatNav';
import ChatBottom from '../components/Chat/ChatBottom';

const Chat = () => {

    const params = useParams();
    const [message, setMessage] = useState('');
    const [msglist, setMsglist] = useState([]);
    // const [navfix, setNavfix] = useState(false);
    const msgRef = useRef(null);

    //get messages
    useEffect(() => {
        const firstgetMsg = () => {
            const chatID = auth.currentUser.email > params.Id ? `${auth.currentUser.email + params.Id}` : `${params.Id + auth.currentUser.email}`
            const collectionRef = collection(db, `messages/${chatID}/chats`)
            const q = query(collectionRef, orderBy("createdAt", "asc"))
            onSnapshot(q, (snapshot) => {
                if (!snapshot.empty) {
                    const msg = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                    setMsglist(msg);
                }
            })
        }

        return firstgetMsg();

    }, [params.Id])

    //on submit and send message
    const sendSubmit = (e) => {
        e.preventDefault();
        sendMessage();
    }

    //send message
    const sendMessage = () => {
        if (message === '') {
            return;
        } else {
            setMessage('')
            const chatID = auth.currentUser.email > params.Id ? `${auth.currentUser.email + params.Id}` : `${params.Id + auth.currentUser.email}`
            const collectionRef = collection(db, `messages/${chatID}/chats`);
            addDoc(collectionRef, { createdAt: Timestamp.now().toMillis(), msgbody: message, sender: auth.currentUser.email })
                .catch(e => console.log(e))
        }
    }

    //on click and send message
    const sendClick = (e) => {
        e.preventDefault();
        sendMessage();

    }

    //get textfield
    const msgOnChange = (e) => {
        setMessage(msgRef.current.value)
    }

    //scroll fixed callback
    // const navFixed = () => {
    //     if (window.scrollY > 200) {
    //         setNavfix(true)
    //     } else {
    //         setNavfix(false)
    //     }
    // }

    //scroll fixed
    // useEffect(() => {
    //     window.addEventListener('scroll', navFixed);
    //     return () => {
    //         window.removeEventListener('scroll', navFixed);
    //     }
    // }, [])

    //sign out
    // const signOut = () => {
    //     auth.signOut()
    // }

    return (
        <>
            <Navbar withauth={true} backtofeed={true} gpchat={true} navfixed={true} />
            <div className="dark:bg-slate-800">
                {/* top */}
                {/* <ChatNav id={params.Id} navfix={navfix} signout={signOut} /> */}
                {/* body */}
                <div className="container bg-white dark:bg-slate-700 mx-auto max-w-3xl pt-20 min-h-screen h-full pb-20">
                    <h1 className="text-center dark:text-slate-300 text-3xl px-2 py-5 font-semibold">Welcome to KT Social chat room</h1>
                    <h2 className="text-center dark:text-slate-200 px-1 text-xl">
                        This is private chat room with
                        <span className="font-semibold dark:text-slate-400 text-gray-700 px-1">{params.Id}</span>
                    </h2>
                    {msglist === null ?
                        <div>Loading..</div> :
                        msglist.map((val, key) => {
                            return (
                                <ChatMessage message={val.msgbody} key={key} sender={val.sender} />
                            )
                        })
                    }
                </div>

                {/* bottom */}
                <ChatBottom onsubmit={sendSubmit} onclick={sendClick} onchange={msgOnChange} msgref={msgRef} msgvalue={message} />
            </div>
        </>
    )
}

export default Chat
