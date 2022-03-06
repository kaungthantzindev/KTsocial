import Postitems from '../components/Post/Postitems';
import Navbar from '../components/Navbar/Navbar';
import { auth, db } from '../firebase';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Postform from '../components/Post/Postform';
import { collection, query, orderBy, onSnapshot, limit, startAfter } from 'firebase/firestore';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../components/Loading';
// import LoadMore from '../components/LoadMore';

const Post = () => {

    const navigator = useNavigate();
    const [postlist, setPostlist] = useState(null);
    const [lastpost, setLastpost] = useState(null);
    const [check, setCheck] = useState(null);

    //check auth
    useEffect(() => {
        const currentUser = auth.onAuthStateChanged(authUser => {
            if (!authUser) {
                navigator('/signin')
            }
        })

        return () => {
            currentUser();
        };
    }, [navigator])

    //get posts 
    useEffect(() => {
        let mount = true;
        const firstpost = () => {
            const postRef = collection(db, "posts")
            const postQuery = query(postRef, orderBy("createdAt", "desc"), limit(5));
            onSnapshot(postQuery, (snapshot) => {
                var last = snapshot.docs[snapshot.docs.length - 1];
                setLastpost(last)
                const post = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
                if (mount) {
                    setPostlist(post)
                }
            })
        }
        firstpost();
        return () => {
            mount = false;
        }
    }, [])

    //next post
    const nextPost = () => {
        const postRef = collection(db, "posts")
        const postQuery = query(postRef, orderBy("createdAt", "desc"), startAfter(lastpost), limit(2));
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

    return (
        <>
            <Navbar withauth={true} gpchat={true} navfixed={true} />
            <div className="bg-gray-100 dark:bg-gray-900 mt-20">
                <div className="lg:container lg:mx-auto md:mx-auto mx-2 md:pt-14 pt-2 lg:pt-17 lg:max-w-3xl md:max-w-xl pb-5">
                    <Postform />
                    {postlist === null ? <div className="text-center"><Loading /></div> :
                        <InfiniteScroll
                            dataLength={postlist.length}
                            next={nextPost}
                            hasMore={lastpost ? <>{lastpost.id === check ? false : true}</> : null}
                            loader={<div className="animate-pulse text-center"><Loading /></div>}
                            endMessage={<div className="text-center">post end</div>}
                        >
                            {
                                postlist.map((val, key) => {
                                    return (
                                        <Postitems id={val.id} username={val.username} key={key} content={val.postbody} image={val.img} avatarurl={val.avatarurl} like={val.liked} />
                                    )
                                })
                            }

                        </InfiniteScroll>
                    }
                    {/* <LoadMore loadmore={nextPost} /> */}
                </div>
            </div>
        </>
    )
}

export default Post
