import Input from "../Input/Input"

const Signform = (props) => {
    return (
        <main>
            <section className="w-full pt-3 dark:bg-slate-900">
                <div className="top-0 w-full h-full"></div>
                <div className="container mx-auto px-4 h-full">
                    <div className="flex items-center justify-center h-full">
                        <div className="w-full lg:w-4/12 px-2 md:w-8/12">
                            <div className="relative dark:bg-slate-800 flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded-lg bg-white border-2 dark:border-slate-400 border-yellow-300 dark:text-slate-300">
                                <div className="flex-auto px-4 lg:px-10 py-10 mb-20">
                                    <div className="text-2xl text-center mb-3 font-medium">
                                        <h1>{props.title}</h1>
                                    </div>
                                    <form>
                                        <Input refname={props.emailref} labelname="Email" typename="email" placeholdername="Email" />
                                        <Input refname={props.passwordref} labelname="Password" typename="password" placeholdername="Password" />

                                        <div className="text-center mt-6" onClick={props.handler}>
                                            <button className="bg-yellow-600 text-white active:bg-yellow-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full" type="button" style={{ transition: "all .15s ease" }}>
                                                {props.button}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                {/* <hr className="mt-6 border-b-1 border-gray-400" />
                                <div className="rounded-t mb-0 px-6 py-6">
                                    <div className="text-center mb-3">
                                        <h6 className="text-md">{props.ortext}</h6>
                                    </div>
                                    <div className="btn-wrapper text-center">
                                        <button className="bg-white active:bg-gray-100 ring-2 ring-yellow-500 ring-offset-2 px-2 py-2 rounded-full border-2 outline-none focus:outline-none mb-1 uppercase shadow-md hover:shadow-lg inline-flex items-center" type="button" style={{ transition: "all .15s ease" }}>
                                            <img src={props.google} alt="google" width={20} height={20} className="w-5" />
                                        </button>
                                        <button className="bg-white active:bg-gray-100 ring-2 ring-yellow-500 ring-offset-2 px-2 py-2 rounded-full border-2 outline-none focus:outline-none mb-1 shadow-md hover:shadow-lg inline-flex items-center" type="button" style={{ transition: "all .15s ease" }}>
                                            <img src={props.github} alt="google" width={20} height={20} className="w-5" />
                                        </button>
                                    </div>
                                </div> */}
                            </div>
                            {/* <div className="flex flex-wrap mt-6">
                                <div className="w-1/2">
                                    <a href="#pablo" onClick={(e) => e.preventDefault()} className="">
                                        <small>Forgot password?</small>
                                    </a>
                                </div>
                                <div className="w-1/2 text-right">
                                    <a href="#pablo" onClick={(e) => e.preventDefault()} className="">
                                        <small>Create new account</small>
                                    </a>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Signform
