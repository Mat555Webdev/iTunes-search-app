import React from "react";
import uuid from "uuid";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Button,
} from "reactstrap";

const SearchResults = (props) => {
  //empty array created for all the search results
  let items = [];
  let results = props.results;
  //if statement to check if th props passed down is not equal to zero
  //so that the loop can run to display the search results
  if (results.length !== 0) {
    for (let i = 0; i < results.results.length; i++) {
      //below i looped through the data passed down as props
      let link = results.results[i].collectionViewUrl;
      let name = results.results[i].artistName;
      let itemTitle = results.results[i].trackCensoredName;
      //pushed each loop in the array
      items.push(
        <ListGroup style={{paddingBottom:"13px", paddingTop:"13px"}}  key={uuid.v4()}>
          <ListGroupItem key={uuid.v4()}>
            <ListGroupItemHeading>{itemTitle}</ListGroupItemHeading>
            <ListGroupItemText>{name}</ListGroupItemText>
            <ListGroupItemText>
              <a
                className="ituneslink"
                rel="noopener noreferrer"
                target="_blank"
                href={link}
                key={uuid.v4()}
              >
                View on iTunes
              </a>
            </ListGroupItemText>

            <Button color="success" onClick={() => addtofavs(name, itemTitle, link)}>
              Add To Favs
            </Button>
          </ListGroupItem>
        </ListGroup>
      );
    }
    //The itunes API return a an array, that has a length of zero
    //when there is no item like the one searhed for...below
    //condition checks and tells the user that their search is invalid
    if (results.results.length === 0) {
      items.push(
        <p key={uuid.v4()}>invalid search, please check your spelling...</p>
      );
    }
  }

  //below code allows the user to add certain items
  //to their favourite list...
  const addtofavs = (name, itemTitle, link) => {
    //below condition will only create a new array
    //and store it to sessionStorage if the value
    //for the 'favlistt' key is set to null
    if (sessionStorage.getItem("favlist") === null) {
      const favs = [];
      sessionStorage.setItem("favlist", JSON.stringify(favs));
    }
    let addfav = JSON.parse(sessionStorage.getItem("favlist"));
    //create a new favourite object
    const newFav = {
      id: uuid.v4(),
      link: link,
      name: name,
      itemTitle: itemTitle,
    };
    //below code checks if the user might be adding two of the
    //same items... and stops he/she from doing so.
    for (let i = 0; i < addfav.length; i++) {
      if (
        addfav[i].name === newFav.name &&
        addfav[i].itemTitle === newFav.itemTitle
      ) {
        alert("item has already been added");
        return;
      }
    }
    //add the new favourite to the array that is stored in
    //session storage
    addfav.push(newFav);

    sessionStorage.setItem("favlist", JSON.stringify(addfav));
    alert("item added to favourites");
  };

  return (
    <div>
      {/* loop inserted into the DOM below */}
      {items}
    </div>
  );
};

export default SearchResults;
