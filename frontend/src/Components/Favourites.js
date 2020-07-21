import React from "react";
import uuid from "uuid";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Button,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";

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
        <ListGroup key={uuid.v4()}>
          <ListGroupItem>
            <ListGroupItemHeading>{title}</ListGroupItemHeading>
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
            <Button color="danger" onClick={() => deletefav(id)}>
              Delete
            </Button>
          </ListGroupItem>
        </ListGroup>
      );
    }
  }
  //below function will allow the user to delerte a favourite
  const deletefav = (id) => {
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
      <Breadcrumb>
        <BreadcrumbItem>
          <a href="/">Home</a>
        </BreadcrumbItem>
        <BreadcrumbItem active>Favourites</BreadcrumbItem>
      </Breadcrumb>
      <h1>Favourites</h1>
      {displayfavs}
    </div>
  );
}

export default Favourites;
