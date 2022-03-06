import Navbar from "../components/Navbar/Navbar"
import { useEffect, useState, useRef } from "react"
import { auth, db, storage } from "../firebase"
import { useNavigate } from "react-router-dom";
import avatar from '../images/avatar.png';
import Postitems from "../components/Post/Postitems";
import { collection, query, onSnapshot, orderBy, limit, startAfter, where, doc, updateDoc } from "firebase/firestore";
import InfiniteScroll from "react-infinite-scroll-component";
import ModalDelete from '../components/Modal/ModalDelete';
import Loading from "../components/Loading";
import { FaImage, FaUpload, FaMoon } from "react-icons/fa";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import toast, { Toaster } from 'react-hot-toast';
import useTheme from "../useTheme";

const Profile = () => {
    const navigator = useNavigate();
    const [user, setUser] = useState(null);
    const [postlist, setPostlist] = useState(null);
    const [lastpost, setLastpost] = useState(null);
    const [check, setCheck] = useState(null);
    const [openmodal, setOpenmodal] = useState(false);
    const [imagemodal, setImagemodal] = useState(false);
    const [image, setImage] = useState(null);
    const [previewimage, setPreviewimage] = useState(null);
    const [progress, setProgress] = useState(null);
    const imgRef = useRef(null);
    const [color,setTheme] = useTheme();

    useEffect(() => {
        const currentUser = auth.onAuthStateChanged(authUser => {
            if (!authUser) {
                navigator('/signin')
                setUser(null)
            } else {
                if (authUser.email != null) {
                    setUser(authUser.email)
                    firstpost();
                }
            }
        })

        return () => {
            currentUser();
        };
    }, [navigator])

    //first post
    const firstpost = () => {
        var postRef = collection(db, "posts")
        var postQuery = query(postRef, where("username", "==", `${auth.currentUser.email}`), orderBy("createdAt", "desc"), limit(5));
        onSnapshot(postQuery, (snapshot) => {
            var last = snapshot.docs[snapshot.docs.length - 1];
            setLastpost(last)
            const post = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            setPostlist(post)
        })
    }

    //next post
    const nextPost = () => {
        var postRef = collection(db, "posts")
        var postQuery = query(postRef, where("username", "==", `${auth.currentUser.email}`), orderBy("createdAt", "desc"), startAfter(lastpost), limit(1));
        onSnapshot(postQuery, (snapshot) => {
            var last = snapshot.docs[snapshot.docs.length - 1];
            setLastpost(last)
            const post = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            setPostlist(postlist => [...postlist, ...post])
        })
        setCheck(lastpost.id)
    }

    const deletemodalHandler = (e) => {
        e.preventDefault();
        setOpenmodal(!openmodal);
    }

    const imagemodalHandler = (e) => {
        e.preventDefault();
        setImagemodal(!imagemodal)
    }

    //to choose image
    const imgopen = () => {
        imgRef.current.click();
    }

    //to change profile avatar
    const imageUploader = (e) => {
        e.preventDefault();
        if (!image) return;
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on("state_changed", (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            setProgress(progress)
        }, (err) => toast.error(err.message, { duration: 3000 }), () => {
            getDownloadURL(uploadTask.snapshot.ref)
                .then(url => {
                    updateProfile(auth.currentUser, {
                        photoURL: url
                    }).then(() => {
                        setPreviewimage(null);
                        setProgress(null)
                        var postRef = collection(db, "posts")
                        var q = query(postRef, where("username", "==", auth.currentUser.email))
                        onSnapshot(q, (snapshot) => {
                            if (!snapshot.empty) {
                                snapshot.docs.forEach((docs) => {
                                    if (docs.exists()) {
                                        const docRef = doc(db, "posts", docs.id)
                                        updateDoc(docRef, { avatarurl: auth.currentUser.photoURL }, { merge: true })
                                            .catch(e => console.log(e))
                                    } else {
                                        return;
                                    }
                                })
                            } else {
                                return;
                            }
                        })
                    })
                        .catch(e => {
                            toast.error(e.message, { duration: 3000 })
                        })
                })
        })
    }


    const imageHandler = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
            var reader = new FileReader();
            reader.onload = function () {
                var dataURL = reader.result;
                setPreviewimage(dataURL);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const darkMode = (e) => {
        e.preventDefault();
        setTheme(color);
    }

    return (
        <div className="bg-gray-100 dark:bg-slate-900">
            <Navbar backtofeed={true} gpchat={true} withauth={true} navfixed={true} />
            <div className="container dark:bg-slate-900 mx-auto pt-24 mt-3">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-start justify-items-center bg-gray-100 dark:bg-slate-900">
                    <div className="bg-gray-200 relative dark:bg-slate-800 rounded-md m-1 p-14 lg:p-20 mx-auto">
                        {/* nested ternary */}
                        <img src={!auth.currentUser ? avatar : !auth.currentUser.photoURL ? avatar : auth.currentUser.photoURL} alt="avatar" className="w-32 h-32 rounded-full mx-auto" />
                        <h2 className="font-semibold text-lg m-2 pt-1 dark:text-slate-300 text-center">
                            {user}
                        </h2>
                        {imagemodal &&
                            <div className="flex items-center justify-between">
                                <div onClick={imgopen} className="bg-yellow-400 active:bg-yellow-500 items-center inline-flex p-3 rounded-full" title="choose image">
                                    <FaImage size={25} color="white" />
                                    <input onChange={imageHandler} ref={imgRef} type="file" id="imageupload" hidden className="hidden invisible" accept="image/*" />
                                </div>
                                <div onClick={imageUploader} className="bg-yellow-400 active:bg-yellow-500 items-center inline-flex p-3 rounded-full">
                                    <FaUpload size={25} color="white" />
                                </div>
                            </div>
                        }
                        <button onClick={imagemodalHandler} className="bg-yellow-400 cursor-default active:bg-yellow-500 py-3 outline-none rounded m-1 w-full">
                            Change image
                        </button>
                        {/* <ModalImage imagemodal={imagemodal} imagemodalHandler={imagemodalHandler} /> */}

                        {/* image preview and progress bar */}
                        {previewimage && <img src={previewimage} alt="previewimage" width="100" height="100" className="mx-auto p-2" />}
                        {progress > 0 && <h1 className="text-center dark:text-slate-300">Uploading {progress} %</h1>}
                        <Toaster position="top-center" reverseOrder={true} />
                       
                        {/* delete button */}
                        <button onClick={deletemodalHandler} className="bg-red-500 cursor-default active:bg-red-400 outline-none py-3 rounded m-1 w-full">
                            Delete

                        </button>
                        <ModalDelete openmodal={openmodal} deletemodalHandler={deletemodalHandler} />

                        {/* darkmode */}
                        <div onClick={darkMode} className="absolute top-3 right-3 ring-1 ring-offset-1 ring-yellow-500 shadow-lg p-3 dark:bg-amber-500 dark:text-slate-200 bg-yellow-400 rounded-full lg:cursor-pointer text-gray-700">
                            <FaMoon size={25} />
                        </div>
                    </div>
                    <div className="p-2 w-full max-w-xl mx-auto">
                        {postlist == null ? <div className="text-center"><Loading /></div> :
                            <InfiniteScroll
                                dataLength={postlist.length}
                                next={nextPost}
                                hasMore={lastpost ? <>{lastpost.id === check ? false : true}</> : null}
                                loader={<div className="animate-pulse text-center"><Loading /></div>}
                                endMessage={<div className="text-center">post end</div>}
                            >
                                {postlist.map((val, key) => {
                                    return (
                                        <Postitems id={val.id} username={val.username} avatarurl={val.avatarurl} key={key} content={val.postbody} image={val.img} like={val.liked} />
                                    )
                                })}

                            </InfiniteScroll>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
