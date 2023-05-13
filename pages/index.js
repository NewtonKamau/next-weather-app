import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   <div className="bg-blue-300 mx-20 mt-20">
      <div className="flex justify-center items-center m-4">
        <input
          className="placeholder-grey-500 placeholder-opacity-50 focus-outline-none focus-ring-2 focus-ring-blue-600 border-2 border-gray-200 rounded-lg p-2 my-2"
          name="search-bar"
          id="search-bar-id"
          type="search"
          placeholder="Search city or zip code..."
        />
        
        <button className="m-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out">
          Search 
        </button>
      </div>
      <div className="bg-amber-50 p-10">

      </div>
    </div>
  )
}
