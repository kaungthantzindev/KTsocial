import { FaImage, FaPlus } from "react-icons/fa"
import avatar from '../../images/avatar.png'
import { useRef, useState } from 'react';
import { db, auth, storage } from "../../firebase";
import { collection, addDoc, Timestamp, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import toast, { Toaster } from "react-hot-toast";

const Postform = () => {

    const postRef = useRef(null);
    const imgRef = useRef(null);
    const [showimg, setShowimg] = useState(null);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState('');
    // const username = auth.currentUser.email;
    const [username, setUsername] = useState(null);
    const [progress, setProgress] = useState(null);
    auth.onAuthStateChanged(user => {
        if (user) {
            setUsername(user.email)
        } else {
            setUsername(null);
        }
    })

    // useEffect(() => {
    //     const checkuser = () => {
    //         auth.onAuthStateChanged(user => {
    //             if (user) {
    //                 setUsername(user.email)
    //             } else {
    //                 setUsername(null);
    //                 navigator("/signin")
    //             }
    //         })
    //     }
    //     return checkuser;
    // }, [])

    //to clear input
    const postonchange = () => {
        setPost(postRef.current.value);
    }

    //handle post
    const postHandler = e => {
        e.preventDefault();
        setPost('')
        setShowimg(null)
        const collectionRef = collection(db, "posts");
        addDoc(collectionRef, { postbody: post, createdAt: Timestamp.now().toDate(), username: username, avatarurl: auth.currentUser.photoURL, userid: auth.currentUser.uid }).then(docs => {
            toast.success("Posted Successfully", { duration: 3000 })
            if (image) {
                const storageRef = ref(storage, `images/${image.name}`)
                const uploadTask = uploadBytesResumable(storageRef, image);
                uploadTask.on("state_changed", (snapshot) => {
                    const progressCount = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                    setProgress(progressCount)
                }, (err) => console.log(err), () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(url => {
                        const docRef = doc(db, "posts", docs.id);
                        updateDoc(docRef, { img: url }, { merge: true })
                            .then(_ => {
                                setProgress(null)
                                toast.success("Uploaded Image successfully", { duration: 3000 })
                            })
                            .catch(e => toast.error(e.message, { duration: 3000 }))
                    })
                })
            }

        }).catch(e => toast.error(e.message, { duration: 3000 }));
    }

    //handle image
    const imageHandler = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
            var reader = new FileReader();
            reader.onload = function () {
                var dataURL = reader.result;
                setShowimg(dataURL);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    //open to choose image
    const imgOpen = () => {
        imgRef.current.click()
    }

    //for remove image preview
    const imgremove = () => {
        setShowimg(null)
    }

    return (
        <div className="bg-white dark:bg-slate-800 dark:border-slate-400 shadow-lg border-2 border-yellow-400 rounded-xl p-2">
            <div className="m-2 flex items-center justify-start">
                <img src={!auth.currentUser ? avatar : !auth.currentUser.photoURL ? avatar : auth.currentUser.photoURL} alt="avatar" className="w-10 h-10 rounded-full" />

                {/* post upload */}
                <input ref={postRef} value={post} onChange={postonchange} className="p-4 bg-gray-200 ml-2 w-full rounded-full dark:bg-slate-200 outline-none" type='text' placeholder='Say something...' />
            </div>
            {showimg && (
                <div className="text-center">
                    <img src={showimg} alt='previewimg' className='w-40 mx-auto' />
                    <button onClick={imgremove} className="text-red-500">remove</button>
                </div>

            )}
            {progress ? <h1 className="text-center dark:text-slate-300">Uploading {progress} %</h1> : null}
            <hr className="my-4 dark:border-slate-400" />
            <div className="flex items-center justify-between mx-3">
                <div onClick={imgOpen} className="bg-yellow-400 dark:bg-slate-400 active:bg-yellow-500 items-center inline-flex p-3 rounded-full" title="choose image">
                    <FaImage size={30} color="white" />
                    {/* get image */}
                    <input ref={imgRef} onChange={imageHandler} type="file" id="imageupload" hidden className="hidden invisible" accept="image/*" />
                </div>
                {/* post handler */}
                <div onClick={postHandler} className="flex items-center bg-yellow-400 p-3 rounded-full active:bg-yellow-500 dark:bg-slate-400">
                    <FaPlus size={25} color="white" /> <span className="pl-2 cursor-default text-white">POST</span>
                </div>
            </div>
            <Toaster position="top-center" reverseOrder={true} />
        </div>
    )
}

export default Postform