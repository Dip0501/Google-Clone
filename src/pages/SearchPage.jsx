import React from "react";
import { Link } from "react-router-dom";
import Search from "../component/Search";
import Response from "../response";
import { useStateValue } from "../StateProvider";
import useGoogleSearch from "../UseGoogleSearch";
import SearchIcon from "@mui/icons-material/Search";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import RoomIcon from "@mui/icons-material/Room";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./SearchPage.css";

function SearchPage() {
  const [{ term }, dispatch] = useStateValue();

  const { data } = useGoogleSearch(term);

  //Mock data, Tesla
  //const data = Response

  console.log(data);

  return (
    <div className="search__page">
      <div className="search__page--header">
        <Link to="/">
          <img
            className="search__page--logo"
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            alt=""
          />
        </Link>
        <div className="search__page--container">
          <Search hideButtons />
          <div className="search__page--options">
            <div className="search__options--left">
              <div className="search__option">
                <SearchIcon />
                <Link to="/all">All</Link>
              </div>
              <div className="search__option">
                <DescriptionIcon />
                <Link to="/news">News</Link>
              </div>
              <div className="search__option">
                <ImageIcon />
                <Link to="/images">Images</Link>
              </div>
              <div className="search__option">
                <LocalOfferIcon />
                <Link to="/shopping">Shopping</Link>
              </div>
              <div className="search__option">
                <RoomIcon />
                <Link to="/maps">Maps</Link>
              </div>
              <div className="search__option">
                <MoreVertIcon />
                <Link to="/more">More</Link>
              </div>
            </div>
            <div className="search__options--right">
              <div className="search__option">
                <Link to="/settings">Settings</Link>
              </div>
              <div className="search__option">
                <Link to="/tools">Tools</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {term && (
        <div className="search__results">
          <p className="search__result--count">
            About {data?.searchInformation.formattedTotalResults}
            results ({data?.searchInformation.formattedSearchTime} seconds) for {term}
          </p>
          {data?.items.map((item) => (
            <div className="search__result">
              <a
                target="_blank"
                className="search__result--link"
                href={item.link}
              >
                {item.pagemap?.cse_image?.length > 0 &&
                  item.pagemap?.cse_image[0]?.src && (
                    <img
                      src={item.pagemap?.cse_image[0]?.src}
                      alt=""
                      className="search__result--img"
                    />
                  )}

                {item.displayLink}
              </a>
              <a
                target="_blank"
                className="search__result--title"
                href={item.link}
              >
                <h2>{item.title}</h2>
              </a>
              <p className="search__result--snippet">{item.snippet}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
