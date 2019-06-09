import React, { Component, Fragment } from "react";

class Search extends Component {
  state = {
    search: ""
  };

  handleSearch = (e) => {
      const { value } = e.target
      this.setState({ search: value })
      this.props.handleSearch(this.state.search)
  }

  render() {
    return (
      <Fragment>
        <input
          onChange={this.handleSearch}
        />
      </Fragment>
    );
  }
}

export { Search as default };
