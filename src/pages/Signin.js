import { useRef } from 'react';
// import google from '../images/google.jpg';
// import github from '../images/github.jpg'
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Navbar from '../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import Signform from '../components/Signform/Signform';
import toast, { Toaster } from 'react-hot-toast';

const Signin = () => {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigator = useNavigate()

    const signinHandler = e => {
        e.preventDefault();
        toast.loading("loading please wait..",{id : 'loadingtoast',duration: 1000})
        signInWithEmailAndPassword(
            auth,
            emailRef.current.value,
            passwordRef.current.value
        ).then(user => {
            navigator("/post")
        }).catch(e => {
            toast.remove("loadingtoast")
            toast.error(e.message,{duration : 3000});
        })
    }

    return (
        <div>
            <Navbar signin={true} signup={true} />
            <Signform title="SignIn" button="signin" ortext="Or sign in with" emailref={emailRef} passwordref={passwordRef} handler={signinHandler} />
            <Toaster position="top-center" reverseOrder={true} />
        </div>
    );
};

export default Signin;
