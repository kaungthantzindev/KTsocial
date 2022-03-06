import { FaRegPaperPlane } from 'react-icons/fa';

const ChatBottom = (props) => {
    return (
        <div className="flex bg-gray-50 dark:bg-slate-700 px-3 items-center h-16 border-t-2 dark:border-slate-400 justify-center fixed bottom-0 left-0 right-0">
            <form onSubmit={props.onsubmit} className="w-full max-w-3xl">
                <input ref={props.msgref} value={props.msgvalue != null ? props.msgvalue : undefined} onChange={props.onchange} type="text" placeholder="send message..." className="p-3 rounded-lg outline-none bg-gray-200 w-full border-2 focus:border-yellow-400 dark:bg-slate-300 " />
            </form>
            <div onClick={props.onclick} className="px-4 py-3 m-1 bg-yellow-500 rounded-lg active:bg-yellow-600 dark:bg-amber-500 ">
                <FaRegPaperPlane size={25} className="text-white" />
            </div>
        </div>
    )
}

export default ChatBottom
