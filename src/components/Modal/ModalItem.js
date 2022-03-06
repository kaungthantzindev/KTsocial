import { Link } from "react-router-dom"

const ModalItem = (props) => {
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white dark:bg-slate-700 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            {props.messenger ?
                                (<>
                                    <div onClick={props.close} className="right-2 bg-gray-100 active:bg-gray-200 dark:bg-slate-300 rounded-full p-3 absolute top-2">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                    </div>
                                </>)
                                : (<>
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                </>)}
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium dark:text-slate-300 text-gray-900" id="modal-title">
                                    {props.title}
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500 dark:text-slate-300">{props.content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-slate-700 py-3 px-3 flex-row-reverse">
                        {props.messenger ? (<>
                            <input ref={props.textref} onChange={props.textonchange} type="email" className="p-3 outline-none dark:bg-slate-300 dark:border-slate-400 rounded-lg w-full border-2 my-2" placeholder="ex: ktsocial@ktsocial.com..." />
                            <Link to="/chat/groupchat" >
                                <div className="w-full dark:bg-slate-200 inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 border border-gray-200 active:bg-gray-200 outline-none sm:w-auto sm:text-sm cursor-default lg:cursor-pointer">
                                    Gp Chat
                                </div>
                            </Link>
                            <Link to={props.text != null && props.text.includes('@') ? `/chat/${props.text}` : '/post'}>
                                <div className="mt-3 w-full inline-flex dark:bg-amber-500 justify-center rounded-md shadow-sm border border-bg-50 px-4 py-2 bg-yellow-500 text-gray-100 text-base font-medium text-gray-700 active:bg-yellow-600 outline-none  sm:mt-0 lg:ml-2 md:ml-2 sm:w-auto sm:text-sm cursor-default lg:cursor-pointer">
                                    Private Chat
                            </div>
                            </Link>
                        </>) : (<>
                            <button onClick={props.actiononclick} type="button" className="w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white active:bg-red-700 outline-none sm:ml-3 sm:w-auto sm:text-sm cursor-default lg:cursor-pointer">{props.actiontext}</button>
                            <button onClick={props.cancelonclick} type="button" className="mt-3 w-full inline-flex justify-center rounded-md shadow-sm border border-bg-50 px-4 py-2 bg-white text-base font-medium text-gray-700 active:bg-gray-200 outline-none  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm cursor-default lg:cursor-pointer">{props.canceltext}</button>
                        </>)}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ModalItem
