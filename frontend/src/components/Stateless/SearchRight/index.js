import "./SearchRight.css";
import { BiSearch } from "react-icons/bi";
import { useContext, useState } from "react";
import { Chat } from "../../../context/ChatProvider";
import { SearchedUser } from "../SearchedUser";

const SearchRight = () => {
  const { user } = useContext(Chat);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState();

  // Search for users based on input value
  const handleSearch = async () => {
    if (!search) {
      setSearchError("Search empty"); // Set Error if search input is empty
      return;
    }
    try {
      const res = await fetch(`/api/user?search=${search}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await res.json();

      if (data.length === 0) {
        setSearchError("User not found"); // Set Error if user not found in database
      }
      setSearchResults(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <section className="search-right">
      <div className="search-input-content">
        <input
          className="search-input"
          type="text"
          placeholder="Search User"
          value={search}
          onFocus={() => setSearchError("")} // Remove error when user starts typing again
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch} className="search-btn">
          Go
        </button>
        <BiSearch className="search-icon" />
        <p className="search-error">{searchError}</p>
      </div>
      {searchResults &&
        searchResults.map((searchedUser) => {
          return (
            <SearchedUser searchedUser={searchedUser} key={searchedUser._id} />
          );
        })}
    </section>
  );
};

export default SearchRight;
