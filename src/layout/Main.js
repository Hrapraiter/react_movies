import './Main.css';

import React from 'react';

import Preloader from '../components/Preloader';
import MovieList from '../components/MovieList';
import Search from '../components/Search';

class Main extends React.Component
{
    state =
        {
            movies:[]
        }
    componentDidMount()
    {
        // Эта функция не явно вызывается всякий раз,
        // когда компонент смонтировался на страницу
        fetch('https://www.omdbapi.com/?s=The%20Transporter&apikey=431e4c78')
            .then(responce => responce.json())
            .then(data => this.setState({movies: data.Search}))
    }
    searchMovie = (str , type=null) =>
    {
        fetch(`https://www.omdbapi.com/?s=${str}&apikey=431e4c78`)
            .then(responce => responce.json())
            .then(data => this.setState({ movies: data.Search }))
    }
    render()
    {
        return(
            <main>
                <Search searchMovie={this.searchMovie} />

                {

                    this.state.movies == null ? <h1>not found</h1> :
                        this.state.movies.length == 0
                        ? <Preloader class="preloader" />
                        : <MovieList movies={this.state.movies} />
                    
                }
            </main>
        )
    }
}
export default Main;