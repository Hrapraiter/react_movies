import './Main.css';

import React from 'react';

import MovieList from '../components/MovieList';

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
    render()
    {
        return(
            <main>
                <MovieList movies={ this.state.movies } />
            </main>
        )
    }
}
export default Main;