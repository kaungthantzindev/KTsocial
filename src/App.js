import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Loading from './components/Loading';

const Post = lazy(() => import("./pages/Post"));
const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));
const Profile = lazy(() => import("./pages/Profile"));
// const Search = lazy(() => import("./pages/Search"));
const Chat = lazy(() => import("./pages/Chat"));
const GroupChat = lazy(() => import("./pages/GroupChat"));

function App() {
  return (
    <div>
      <Suspense fallback={<div className="flex h-screen bg-white dark:bg-slate-800 items-center justify-center"><Loading /></div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/post" element={<Post />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/search" element={<Search />} /> */}
          <Route path="/chat/:Id" element={<Chat />} />
          <Route path="/chat/groupchat" element={<GroupChat />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
