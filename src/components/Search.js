import './Search.css';

import React from 'react';


class Search extends React.Component
{
    state =
        {
            search: "",
            type:"all"
        }
    handleKey = (event) =>
    {
        if (event.key === 'Enter')
        {
            this.props.searchMovie(this.state.search,this.state.type);
        }
    }
    handlerFilter = (event) =>
    {
        this.setState
            (
                () =>({ type: event.target.dataset.type }),
                () => ({ search: this.props.searchMovie(this.state.search, this.state.type) })
            );

        //this.props.searchMovie(this.state.search, this.state.type);
    }
    render()
    {
        return(
            <div className="search">
                <input type="search"
                    placeholder="Поиск"
                    value={this.state.search}
                    onChange={(e) => this.setState({ search: e.target.value })}
                    onKeyUp={this.handleKey}
                />
                <button onClick={() => this.props.searchMovie(this.state.search)}>
                    Поиск
                </button>
                <div className="radio">
                    <input type="radio" name="category" data-type="all" checked={this.state.type  === "all"} onChange={this.handlerFilter} id="category-all" />            <label for="category-all">All</label>
                    <input type="radio" name="category" data-type="movie" checked={this.state.type === "movie"} onChange={this.handlerFilter} id="category-movie" />       <label for="category-movie">Movie</label>
                    <input type="radio" name="category" data-type="series" checked={this.state.type === "series"} onChange={this.handlerFilter} id="category-series"/>      <label for="category-series">Series</label>
                    <input type="radio" name="category" data-type="game" checked={this.state.type  === "game"} onChange={this.handlerFilter} id="category-game" />         <label for="category-game">Game</label>
                </div>
            </div>
        )
    }
};
export default Search;