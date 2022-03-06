import home from '../images/home.svg';
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar/Navbar';

const Home = () => {
  return (
    <div>
      <Navbar signin={true} signup={true} />
      <div>
        <div className="bg-white dark:bg-slate-800 -mt-20 min-h-screen items-center grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 justify-items-center">
          {/* left */}
          <div className="px-8 max-w-xl order-2 dark:text-slate-300 lg:order-1 md:order-1">
            <h1 className="lg:text-5xl text-3xl font-bold py-5">Welcome to KtSocial</h1>
            <h2 className="lg:text-xl sm:text-lg font-medium pb-5">The Best Social Media In the World</h2>
            <p className="text-sm font-light pb-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of.</p>
            <Link to="/post">
              <button className="px-5 py-3 mb-3 bg-yellow-400 dark:bg-amber-500 dark:text-gray-50 dark:ring-amber-500 rounded-md ring-2 ring-yellow-400 active:ring-yellow-600 ring-offset-2">Get Started</button>
            </Link>
          </div>
          {/* right */}
          <div className="p-6 order-1 lg:order-2 md:order-2 mt-20">
            <img src={home} alt="home" height={500} width={800} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
