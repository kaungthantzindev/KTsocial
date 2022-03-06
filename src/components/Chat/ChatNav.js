import { FaArrowLeft, FaUserCircle, FaSignOutAlt, FaPeopleArrows } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ChatNav = (props) => {
    return (
        <div className={`flex px-3 h-16 border-b-2 bg-gray-100 items-center justify-between lg:justify-evenly ${props.navfix && 'fixed inset-0 transition-all duration-1000 text-gray-600'}`}>
            {props.navfix ? (
                <>
                    <Link to="/post" className="p-4 cursor-default rounded-full active:bg-gray-200" >
                        <FaArrowLeft size={20} />
                    </Link>
                    <Link to="/profile" className="p-4 cursor-default rounded-full active:bg-gray-200" >
                        <FaUserCircle size={20} />
                    </Link>
                    <Link to="/chat/groupchat" className="p-4 cursor-default rounded-full active:bg-gray-200" >
                        <FaPeopleArrows size={20} />
                    </Link>
                    <div onClick={props.signout} className="p-4 rounded-full active:bg-gray-200" >
                        <FaSignOutAlt size={20} />
                    </div>
                </>
            ) : (
                    <>
                        <h1>You are chatting with</h1>
                        <h2>{props.id}</h2>
                    </>
                )}
        </div>

    )
}

export default ChatNav
