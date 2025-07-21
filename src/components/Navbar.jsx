import { useState } from "react"
import { FaSearch } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

const Navbar = () => {

    return (
        <>
            <nav className="bg-balck text-white px-4 flex py-2 items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-yellow-400 text-black font-bold px-2 py-1 text-xl rounded">IMDB
                    </div>

                    <div className="flex items-center gap-1 cursor-pointer">
                        <FiMenu className="text-black text-xl" />
                        <span className="text-sm text-black font-semibold">Menu</span>
                    </div>
                </div>
                <form className="flex flex-1 max-w-2xl mx-6 border border-gray-400 rounded overflow-hidden">

                    <input
                        type="text"
                        placeholder="Search IMDb"
                        // value={search}
                        // onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-3 py-1 text-black outline-none"
                    />
                    <select className="bg-gray-800 text-white px-2 outlined-none">
                        <option value="">All</option>
                        <option value="">Movies</option>
                        <option value="">Tv Shows</option>

                    </select>

                    <button className="bg-white px-3 flex items-center " type="submit" >
                        <FaSearch className="text-gray-700"/>
                    </button>

                </form>
            </nav>
        </>
    )
}

export default Navbar
