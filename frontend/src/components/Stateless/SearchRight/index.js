import "./SearchRight.css";
import { BiSearch } from "react-icons/bi";
import { useContext, useState } from "react";
import { Chat } from "../../../context/ChatProvider";
import { SearchedUser } from "../SearchedUser";

const SearchRight = () => {
  const { user, iPadSearch, setiPadSearch } = useContext(Chat);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState();

  const iPadScreen = window.matchMedia("(max-width: 1024px)");

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
      setSearchError(err.message);
    }
  };

  console.log(iPadSearch);
  return (
    <>
      {!iPadScreen.matches ? (
        <section className="search-right">
          <div className="search-input-content">
            <span className="search-input-span">
              <input
                className="search-input"
                type="text"
                placeholder="Search for a user"
                value={search}
                onFocus={() => setSearchError("")} // Remove error when user starts typing again
                onChange={(e) => setSearch(e.target.value)}
              />
              <BiSearch className="search-icon" />
              <p className="search-error">{searchError}</p>
            </span>
            <button onClick={handleSearch} className="search-btn">
              Search
            </button>
          </div>
          {searchResults &&
            searchResults.map((searchedUser) => {
              return (
                <SearchedUser
                  searchedUser={searchedUser}
                  key={searchedUser._id}
                />
              );
            })}
        </section>
      ) : (
        <section className={iPadSearch ? "search-right" : "search-right-ipad"}>
          <div className="search-input-content">
            <span className="search-input-span">
              <input
                className="search-input"
                type="text"
                placeholder="Search for a user"
                value={search}
                onFocus={() => setSearchError("")} // Remove error when user starts typing again
                onChange={(e) => setSearch(e.target.value)}
              />
              <BiSearch className="search-icon" />
              <p className="search-error">{searchError}</p>
            </span>
            <button onClick={handleSearch} className="search-btn">
              Search
            </button>
          </div>
          {searchResults &&
            searchResults.map((searchedUser) => {
              return (
                <SearchedUser
                  searchedUser={searchedUser}
                  key={searchedUser._id}
                />
              );
            })}
        </section>
      )}
    </>
  );
};

export default SearchRight;
