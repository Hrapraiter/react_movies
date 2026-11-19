import './Movie.css';

function Movie(props)
{
    return (
        <div className="card">
            <img src={props.Poster} alt="poster" />
            <h3>{props.Title}</h3>
            Год: {props.Year}
            Тип: {props.Type === "movie" ? "Фильм" : "Сериал"}
        </div>
    )
}
export default Movie;