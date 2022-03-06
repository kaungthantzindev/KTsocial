import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { FaSignOutAlt, FaUserCircle, FaArrowLeft, FaComments } from 'react-icons/fa';
import useTheme from '../../useTheme';

const Navbar = (props) => {

    useTheme()

    const navigator = useNavigate();

    const signoutHandle = () => {
        auth.signOut()
        navigator("/signin")
    }

    const previousroute = () => {
        navigator(-1)
    }

    return (
        <div>
            <nav className={`${props.navfixed && 'fixed z-50 inset-0'} flex justify-between items-center h-20 bg-white dark:bg-slate-800 dark:border-slate-400 shadow-sm border-b-2`}>
                {/* left */}
                <div>
                    {props.backtofeed ?
                        (<>
                            <div onClick={previousroute} className="mx-1 px-5 cursor-default lg:cursor-pointer rounded-lg md:mx-5 md:px-5 md:text-2xl lg:px-10 lg:mx-10 lg:text-2xl py-5 hover:bg-gray-200 text-xl font-medium dark:text-slate-300">
                                <FaArrowLeft />
                            </div>
                        </>) :
                        (<>
                            <Link to="/" className="mx-1 px-5 cursor-default lg:cursor-pointer rounded-lg md:mx-5 md:px-5 md:text-2xl lg:px-10 lg:mx-10 lg:text-2xl py-5 hover:bg-gray-200 text-xl font-medium dark:text-slate-300" >
                                KTsocial
                            </Link>
                        </>)
                    }
                </div>

                {/* right */}
                <div>
                    <ul className="flex mx-1 px-2 text-sm md:mx-5 md:px-5 md:text-md lg:mx-10 lg:px-10 lg:text-lg py-5">
                        {props.signin &&
                            <Link to="/signin">
                                <li className="p-3 active:bg-gray-200 rounded-md cursor-pointer dark:text-slate-300">
                                    Signin
                                </li>
                            </Link>
                        }
                        {props.signup &&
                            <Link to="/signup">
                                <li className="p-3 ml-1 rounded-md bg-yellow-300 active:ring-yellow-600 dark:bg-amber-500 cursor-pointer ring-offset-2 ring-2 ring-yellow-400">
                                    Signup
                                </li>
                            </Link>
                        }
                        {/* {props.moon &&
                            <div className="p-3 active:bg-gray-200 rounded-md cursor-default dark:text-slate-300">
                                <FaMoon size={25} />
                            </div>
                        } */}
                        {props.gpchat &&
                            <Link to="/chat/groupchat" className="p-3 active:bg-gray-200 rounded-md cursor-default dark:text-slate-300">
                                <FaComments size={25} />
                            </Link>
                        }
                        {props.withauth &&
                            (
                                <>
                                    <Link to="/profile" className="p-3 active:bg-gray-200 rounded-md cursor-default dark:text-slate-300">
                                        <FaUserCircle size={25} />
                                    </Link>
                                    <div onClick={signoutHandle}>
                                        <li className="p-3 active:bg-gray-200 rounded-md cursor-default dark:text-slate-300">
                                            <FaSignOutAlt size={25} />
                                        </li>
                                    </div>
                                </>
                            )
                        }
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
