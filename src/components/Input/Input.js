const Input = (props) => {
    return (
        <>
        <div className="relative w-full mb-3">
            <label className="block uppercase text-xs font-bold mb-2" htmlFor="grid-password">
                {props.labelname}
            </label>
            <input ref={props.refname} type={props.typename} className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring focus:ring-yellow-300 w-full" placeholder={props.placeholdername} style={{ transition: "all .15s ease" }} />
        </div>
        </>
    )
}

export default Input
