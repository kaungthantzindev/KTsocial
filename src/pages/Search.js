// import Navbar from '../components/Navbar/Navbar';
// import { useState } from 'react';
// import { startAt, endAt, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
// import { db } from '../firebase';
// import Postitems from '../components/Post/Postitems';
// const Search = () => {

//     const [result, setResult] = useState('');
//     const [finalresult, setFinalresult] = useState(null);

//     const searchOnchange = (e) => {
//         e.preventDefault();
//         setResult(e.target.value)
//     }

//     // const searchHandler = (e) => {
//     //     e.preventDefault();
//     //     setResult('')
//     //     const searchRef = collection(db, "posts");
//     //     const searchQuery = query(searchRef, orderBy("username", "desc"), startAt(result+"@gmail.com"), endAt(result));
//     //     onSnapshot(searchQuery, (snapshot) => {
//     //         const res = snapshot.docs.map((doc) => ({
//     //             id: doc.id,
//     //             ...doc.data(),
//     //         }))
//     //         setFinalresult(res);
//     //     })
//     // }


//     return (
//         <div>
//             <Navbar backtofeed={true} withauth={true} />
//             <form className="lg:flex md:flex items-center md:justify-center lg:justify-center mt-4 sm:flex-row">
//                 <div className="p-1">
//                     <input type="text" value={result} onChange={searchOnchange} className="p-1 text-gray-600 bg-gray-100 h-14 w-full rounded border-2 outline-none border-yellow-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300" placeholder="search users,posts..." />
//                 </div>
//                 <div className="p-1">
//                     <button className="py-4 px-4 bg-yellow-400 w-full rounded active:bg-yellow-500">Search</button>
//                 </div>
//             </form>
//             {finalresult &&
//                 finalresult.filter((val, key) => {
//                     return val.username.includes(result) || val.postbody.includes(result)
//                 }).map((val, key) => {
//                     return (
//                         <Postitems id={val.id} likecount={val.like} username={val.username} key={key} content={val.postbody} image={val.img} like={val.liked} />
//                     )
//                 })
//             }
//         </div>
//     )
// }

// export default Search
