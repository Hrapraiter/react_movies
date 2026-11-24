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
        // this.setState
        //     (
        //         () =>({ type: event.target.dataset.type }), // он применится ведь он updater
        //         () => ({ search: this.props.searchMovie(this.state.search, this.state.type) }) // а это callback его return не читается но тело исполняется значит вернувшийся  search не применится к state
        //     );
        // setState ассинхроный метод во избежание гонок памяти придуман updater
        // {key:value} // literal пишет сразу как получил
        // () => ({key : value}) // updater вызовется с prevState иначе отработает как литерал
        // у литералов и updater это патчи они применяются сразу но также могут упасть батч это очередь обновлений нужно для оптимизации вызовов
        // prevState - это state во время обновления до применения всех изменений сам не знаю почему так назвали
        // callback's отрабатывают после завершения обновления state и их возращаемые значения никем не учитываются
        // изходя из этого аналог который отработает также но есть риск гонки с type поэтому нужен в идеале callback
        
           // const e_type = event.target.dataset.type;
           // this.setState({ type: e_type });
           // this.props.searchMovie(this.state.search, e_type);
       
        // или идеале т.к. в таком случае radio гарантом поймает нужный type после изменения
        this.setState
        (
            ()=>({type: event.target.dataset.type}) , // updater
            ()=>this.props.searchMovie(this.state.search , this.state.type)//callback
        );
        
        console.log(this.state);
        //this.props.searchMovie(this.state.search, this.state.type);
    }
    render()
    {
        return(
            <div>
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
                </div>
                <div className="radio">
                    <label><input type="radio" name="category" data-type="all" checked={this.state.type === "all"} onChange={this.handlerFilter}/>       All   </label>
                    <label><input type="radio" name="category" data-type="movie" checked={this.state.type === "movie"} onChange={this.handlerFilter}/>   Movie </label>
                    <label><input type="radio" name="category" data-type="series" checked={this.state.type === "series"} onChange={this.handlerFilter} />Series</label>
                    <label><input type="radio" name="category" data-type="game" checked={this.state.type === "game"} onChange={this.handlerFilter}/>     Game  </label>
                </div>
            </div>
        )
    }
};
export default Search;