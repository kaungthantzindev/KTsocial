import { useRef } from 'react';
// import google from '../images/google.jpg';
// import github from '../images/github.jpg'
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Navbar from '../components/Navbar/Navbar';
import Signform from '../components/Signform/Signform';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Signup = () => {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigator = useNavigate()

    const signupHandler = e => {
        e.preventDefault();
        createUserWithEmailAndPassword(
            auth,
            emailRef.current.value,
            passwordRef.current.value,
        ).then(user => {
            navigator("/post")
        }).catch(e => {
            toast.error(e.message, { duration: 3000 })
        })
    }

    return (
        <div>
            <Navbar signin={true} signup={true} />
            <Signform title="SignUp" button="SignUp" ortext="Or sign up with" emailref={emailRef} passwordref={passwordRef} handler={signupHandler} />
            <Toaster position="top-center" reverseOrder={true} />
        </div>
    );
};

export default Signup;
