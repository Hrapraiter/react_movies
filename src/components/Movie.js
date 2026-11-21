import './Movie.css';

function Movie(props)
{
    return (
        <div className="card">
            <img src={props.Poster} alt="poster" />
            <h3>{props.Title}</h3>
            <div>Год: {props.Year}</div>
            <div>Тип: {props.Type === "movie" ? "Фильм" : "Сериал"}</div>
        </div>
    )
}
export default Movie;