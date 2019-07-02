import React, { createContext } from 'react';

const SearchContext = createContext({
  search: '',
  updateSearch: () => {},
});

export class SearchProvider extends React.Component {
  updateSearch= newSearch => {
    this.setState({ search: newSearch });
  };

  state = {
    search: '',
    updateSearch: this.updateSearch,
  };

  render() {
    return (
      <SearchContext.Provider value={this.state}>
        {this.props.children}
      </SearchContext.Provider>
    );
  }
}

export const SearchConsumer = SearchContext.Consumer;
