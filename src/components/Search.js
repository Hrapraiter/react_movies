import './Search.css';

import React from 'react';


class Search extends React.Component
{
    state =
        {
            search: "The Transporter",
            type: "all",
            page:1
        }
    handleKey = (event) =>
    {
        if (event.key === 'Enter')
        {
            this.props.searchMovie(this.state.search, this.state.type);
            this.setState({ page: 1 });
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
            () => { this.props.searchMovie(this.state.search, this.state.type); this.setState({ page: 1 }); }//callback
        );
        
        console.log(this.state);
        //this.props.searchMovie(this.state.search, this.state.type);
    }
    prevPage = () =>
    {
        this.setState
        (
            () => (this.state.page > 1 ? { page: this.state.page - 1 } : { page: 1 }),
            () => this.props.searchMovie(this.state.search , this.state.type , this.state.page)
        );
    }
    nextPage = (totalPages) =>
    {
        this.setState
        (
            () => ({ page: this.state.page < totalPages ? this.state.page + 1 : this.state.page }),
            () => this.props.searchMovie(this.state.search , this.state.type , this.state.page)
        );
    }
    setPage = (num) =>
    {
        this.setState
        (
            () => ({ page: num }),
            () => this.props.searchMovie(this.state.search, this.state.type,this.state.page)
        );
    }
    render()
    {
        const itemsPerPage = 10;
        const viewRange = itemsPerPage/2;
        const totalPages = Math.ceil(this.props.totalItems / itemsPerPage);
        const lastIndex = totalPages <= 10 ? totalPages + 1 : this.state.page + viewRange;
        const forceMinRange = this.state.page - viewRange - 1
        const firstIndex = forceMinRange >= 0 ? forceMinRange : 0;
        let num = [];
        for (let i = 1; i <= totalPages; i++)
        {
            num.push(i);
        }
        return (
            <div>
                <div className="search">
                    <input type="search"
                        placeholder="Поиск"
                        value={this.state.search}
                        onChange={(e) => this.setState({ search: e.target.value })}
                        onKeyUp={this.handleKey}
                    />
                    <button className="btn" onClick={() => { this.props.searchMovie(this.state.search, this.state.type); this.setState({page:1}) }}>
                        Поиск
                    </button>
                </div>
                <div className="radio">
                    <label><input type="radio" name="category" data-type="all" checked={this.state.type === "all"} onChange={this.handlerFilter}/>       All   </label>
                    <label><input type="radio" name="category" data-type="movie" checked={this.state.type === "movie"} onChange={this.handlerFilter}/>   Movie </label>
                    <label><input type="radio" name="category" data-type="series" checked={this.state.type === "series"} onChange={this.handlerFilter} />Series</label>
                    <label><input type="radio" name="category" data-type="game" checked={this.state.type === "game"} onChange={this.handlerFilter}/>     Game  </label>
                </div>
                <div className="pagination">
                    <button className="btn" onClick={this.prevPage}>Prev</button>
                    <div className="page-numbers">
                        {
                            num.slice(firstIndex, lastIndex).map
                                (
                                    (element, index) =>
                                    (
                                        <button className={`btn${(element == this.state.page ? ' selected-page' : '')}`}
                                            key={index}
                                            onClick={ () => this.setPage(element)}
                                        >
                                            {element}
                                        </button>
                                    )
                                )
                        }
                    </div>
                    <button className="btn" onClick={() => this.nextPage(totalPages)}>Next</button>
                </div>
            </div>
        )
    }
};
export default Search;