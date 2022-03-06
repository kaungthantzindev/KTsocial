import { FaArrowUp } from 'react-icons/fa';
const ScrollToTop = () => {

    const scrollHandler = _ => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <div onClick={scrollHandler} className="fixed bottom-10 right-10 lg:cursor-pointer md:cursor-pointer ring-yellow-400 active:bg-yellow-600 p-3 shadow-lg rounded-full ring-2 ring-offset-2 bg-yellow-400">
            <FaArrowUp size={20} />
        </div>
    )
}

export default ScrollToTop
