import React, { Component } from "react";
import SearchResults from "./SearchResults";
import {
  Button,
  InputGroup,
  InputGroupAddon,
  Input,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.mediaonChange = this.mediaonChange.bind(this);
    this.searchonChange = this.searchonChange.bind(this);
    this.fetchSearchResults = this.fetchSearchResults.bind(this);
    this.state = {
      media: "all",
      searchFor: "",
      searchResults: [],
    };
  }
  //below code will change the state of this component
  //based on what the user wants to search
  mediaonChange(e) {
    this.setState({
      media: e.target.value,
    });
  }
  searchonChange(e) {
    this.setState({
      searchFor: e.target.value,
    });
  }
  //below code will fetch data from express server
  //when the user clicks search
  fetchSearchResults(e) {
    e.preventDefault();
    fetch("/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        //data below is gonna be accessed by the server
        //which is going to specify the media type and
        //what needs to be searched.
        media: this.state.media,
        searchFor: this.state.searchFor,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          searchResults: result,
        });
      })
      .catch((error) => alert("Server is currently down"));
  }
  render() {
    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem active>Home</BreadcrumbItem>
          <BreadcrumbItem>
            <a href="/fav">Favourites</a>
          </BreadcrumbItem>
        </Breadcrumb>
        <form onSubmit={this.fetchSearchResults}>
          <select onChange={this.mediaonChange}>
            <option>all</option>
            <option>movie</option>
            <option>music</option>
            <option>podcast</option>
            <option>musicVideo</option>
            <option>audiobook</option>
            <option>shortFilm</option>
            <option>tvShow</option>
            <option>software</option>
            <option>ebook</option>
          </select>
          <br />
          <InputGroup>
            <Input required onChange={this.searchonChange} type="text" />
            <InputGroupAddon addonType="append">
              <Button color="info">Search</Button>
            </InputGroupAddon>
          </InputGroup>
        </form>
        <SearchResults results={this.state.searchResults} />
      </div>
    );
  }
}

export default SearchForm;
