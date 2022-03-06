import { useState, useEffect } from 'react';
import { FaHeart, FaTrash, FaFacebookMessenger, FaCheckCircle } from 'react-icons/fa';
import ScrollToTop from '../Scroll/ScrollToTop';
import avatar from '../../images/avatar.png';
import { doc, deleteDoc, arrayUnion, arrayRemove, setDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { Link } from 'react-router-dom';
import ScrollMsg from '../Scroll/ScrollMsg';
import toast, { Toaster } from 'react-hot-toast';

const Postitems = (props) => {

    const [isreadmore, setIsreadmore] = useState(true);
    const [like, setLike] = useState(false);
    const [scroll, setScroll] = useState(false);
    const [disable, setDisable] = useState(false);
    // const [likecount, setLikecount] = useState(0);

    //checking user is already liked or not
    useEffect(() => {
        const checkliked = () => {
            if (props.like && props.like.includes(auth.currentUser.email)) {
                setLike(false)
                // console.log("yo can't like")
            } else {
                setLike(true)
                // console.log("you can like")
            }
        }
        return checkliked();
    }, [props.like])

    //add like
    const addlike = () => {
        setDisable(true)
        if (like === true) {
            const likeRef = doc(db, "posts", props.id);
            setDoc(likeRef, { liked: arrayUnion(auth.currentUser.email) }, { merge: true })
                .then(_ => {
                    setLike(false)
                    setDisable(false)
                })
        } else {
            console.log("you can't like")
        }
    }

    //dislike
    const dislike = () => {
        setDisable(true)
        if (like === false) {
            const likeRef = doc(db, "posts", props.id);
            setDoc(likeRef, { liked: arrayRemove(auth.currentUser.email) }, { merge: true })
                .then(_ => {
                    setDisable(false)
                    setLike(true)
                })
        } else {
            console.log("you can't diskliked")
        }
    }

    //read more
    const reademoreHandler = _ => {
        setIsreadmore(!isreadmore);
    }

    //scroll
    const scrollHandler = _ => {
        if (window.scrollY > 100) {
            setScroll(true);
        } else {
            setScroll(false)
        }
    }

    //delete
    const deleteHandler = () => {
        const dbRef = doc(db, "posts", props.id)
        if (auth.currentUser.email === props.username) {
            deleteDoc(dbRef).then(_ => {
                toast.success("Deleted successfully")
            }).catch(e => toast.error(e.message));
        } else {
            console.log('cannot');
        }
        // deleteDoc(dbRef)
    }

    //scroll listener
    useEffect(() => {
        window.addEventListener('scroll', scrollHandler);
        return () => {
            window.removeEventListener('scroll', scrollHandler);
        }
    }, [])


    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl hover:shadow-2xl p-3 lg:px-10 md:px-5 border-2 border-yellow-300 dark:border-slate-400 my-6">
            <div className="flex items-center bg-gray-100 dark:bg-slate-600 rounded-full px-2 my-2 justify-between dark:text-slate-300 ">
                {/* avatar */}
                <div className="flex items-center">
                    <img src={props.avatarurl != null ? props.avatarurl : avatar} alt="avatar" className="w-10 h-10 rounded-full" />
                    <h2 className={`py-3 text-md font-semibold pl-2  ${props.username === 'ktsocial@ktsocial.com' && 'flex items-center'}`}>
                        {props.username && props.username.slice(0, props.username.indexOf('@'))}
                        {/* {props.username} */}
                        {props.username === "ktsocial@ktsocial.com" && <FaCheckCircle className="text-yellow-500 pl-1" size={20} />}
                    </h2>
                </div>
                {/* {props.likecount > 0 && <i>{props.likecount} like</i>} */}
                {/* like */}
                {props.like != null && <small className="text-gray-700 dark:text-slate-300 font-semibold">{props.like.length} likes</small>}
            </div>
            {/* image */}
            <div className="p-2">
                {props.image ? <img onDoubleClick={like ? addlike : dislike} width={1000} height={600}
                    className="object-center rounded-xl w-full object-cover" src={props.image} alt="postimage" /> : null}
            </div>
            {/* content */}
            <p onClick={reademoreHandler} className="pt-2 dark:text-slate-300">
                {isreadmore ? props.content?.slice(0, 150) : props.content}
            </p>
            <span onClick={reademoreHandler} className="text-gray-500 md:cursor-pointer lg:cursor-pointer">
                {props.content?.length > 149 ?
                    isreadmore ?
                        'see more...'
                        : 'see less..'
                    : null}
            </span>
            <div className="py-3 flex items-center">
                <button disabled={disable} onClick={like ? addlike : dislike} className="active:bg-gray-300 outline-none py-3 w-full bg-gray-100 rounded cursor-default lg:cursor-pointer md:cursor-pointer dark:bg-slate-700">
                    <FaHeart className={like === true ? ' mx-auto stroke-2 text-gray-500' : 'text-red-500 dark:text-pink-700 scale-125 transition-all duration-500 mx-auto'} size={25} />
                </button>
                {auth.currentUser.email === props.username ?
                    (<>
                        <div onClick={deleteHandler} className="ml-1 active:bg-gray-300 outline-none py-3 w-full bg-gray-100 dark:bg-slate-700 rounded">
                            <FaTrash className="mx-auto text-gray-500" size={24} />
                        </div>
                    </>) :
                    (<>
                        <Link to={`/chat/${props.username}`} className="ml-1 active:bg-gray-300 outline-none py-3 dark:bg-slate-700 w-full bg-gray-100 rounded">
                            <div>
                                <FaFacebookMessenger size={25} className="mx-auto text-gray-500" />
                            </div>
                        </Link>
                    </>)}
            </div>
            {scroll && (
                <>
                    <ScrollMsg />
                    <ScrollToTop />
                </>
            )}
            <Toaster position="top-center" reverseOrder={true} />
        </div >
    )
}

export default Postitems
