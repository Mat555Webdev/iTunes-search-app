import React from "react";
import { Link } from "react-router-dom";
import uuid from "uuid";

function Favourites() {
  let displayfavs = [];
  let favourites = JSON.parse(sessionStorage.getItem("favlist"));
  if (favourites !== null) {
    for (let i = 0; i < favourites.length; i++) {
      let link = favourites[i].link;
      let id = favourites[i].id;
      let name = favourites[i].name;
      let title = favourites[i].itemTitle;
      displayfavs.push(
        <div className="favitems" style={{ display: "flex" }} key={uuid.v4()}>
          <a
            className="ituneslink"
            rel="noopener noreferrer"
            target="_blank"
            href={link}
            key={uuid.v4()}
          >
            Go to iTunes
          </a>
          <p className="favname" key={uuid.v4()}>
            {name}:
          </p>

          <p className="favtitle" key={uuid.v4()}>
            {title}
          </p>
          <button onClick={() => deletefav(id)} id="deletefav">
            X
          </button>
        </div>
      );
    }
  }
  //below function will allow the user to delerte a favourite
  const deletefav = id => {
    let favourites = JSON.parse(sessionStorage.getItem("favlist"));
    //filter out the item that the user doesn't want
    //on their list...
    let filtered = favourites.filter((value, index, arr) => {
      return value.id !== id;
    });
    sessionStorage.setItem("favlist", JSON.stringify(filtered));
    window.location.reload();
  };

  return (
    <div>
      <Link to="/">
        <p>Home</p>
      </Link>
      <h1>Favourites</h1>
      {displayfavs}
    </div>
  );
}

export default Favourites;
