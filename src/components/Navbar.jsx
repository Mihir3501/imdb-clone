import { useState } from "react"
import { FaSearch } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [search, setSearch] = useState("")
    const navigate = useNavigate();

    const handleSearch =(e)=>{
        e.preventDefault();
        if(search.trim()){
            navigate(`/search/${search}`)
            setSearch("")
        }
    }

    return (
        <>
            <nav className="bg-black text-white px-4 flex py-2 items-center justify-between">
                <div className="flex  items-center gap-4">
                    <div className="bg-yellow-400 text-white font-bold px-2 py-1 text-xl rounded">IMDB
                    </div>

                    <div className="flex items-center gap-1 cursor-pointer">
                        <FiMenu className="text-white text-xl" />
                        <span className="text-sm text-white font-semibold">Menu</span>
                    </div>
                </div>
                <form className="flex flex-1 max-w-2xl mx-6 border border-gray-400 rounded overflow-hidden">

                    <input
                        type="text"
                        placeholder="Search IMDb"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-3 py-1 text-black outline-none"
                    />
                    <select className="bg-gray-900 text-white px-2 outlined-none">
                        <option value="">All</option>
                        <option value="">Movies</option>
                        <option value="">Tv Shows</option>

                    </select>

                    <button className="bg-white px-3 flex items-center " type="submit" >
                        <FaSearch className="text-gray-700" />
                    </button>
                </form>
                <div className="flex items-center gap-6 text-sm">
                    <a href="#" className="hover:text-yellow-400">
                        IMDB <span className="text-blue-500">Pro</span>
                    </a>
                    <a href="#" className="hover:text-yellow-400 flex gap-1 items-center">
                        <span className="text-xl">➕</span>Watchlist
                    </a>
                    <a href="#" className="hover:text-yellow-400">Sign in</a>
                    <select className="text-white bg-black" id="">
                        <option value="">EN</option>
                        <option value="">HI</option>
                    </select>
                </div>
            </nav>
        </>
    )
}

export default Navbar
