import React from 'react';
import {connect} from 'react-redux';
import Navbar from './Navbar';
import MovieCard from "./MovieCard";
import { addMovies, setShowFavourites } from '../actions';
import { data as moviesList } from '../data';


class App extends React.Component {
  componentDidMount(){
    //this.props.store.subscribe(()=>this.forceUpdate());
    this.props.dispatch(addMovies(moviesList));
  }
    // make api call
  //   //dispatch action
  //   store.dispatch(addMovies(data));
      
  //   console.log('STATE', this.props.store.getState());
  // }
  isMovieFavourite =(movie) => {
    const { movies } = this.props;

    const index = movies.favourites.indexOf(movie);
    if (index !== -1){
      return true;
    }
    return false;
  }

  onChangeTab =(val) =>{
    this.props.dispatch(setShowFavourites(val))
  }

  render(){
    const { movies, search } = this.props; // { movies:{},search: {}}
    const {list , favourites, showFavourites} = movies;
    console.log('RENDER', this.props);

    const displayMovies = showFavourites ? favourites : list;
    return (
      <div className="App">
        <Navbar search={search} />
        <div className="main">
          <div className="tabs">
            <div className={`tab ${showFavourites ? '' : 'active-tabs'}`} onClick={() => this.onChangeTab(false)}>Movies</div>
              <div className= {`tab ${showFavourites ?  'active-tabs' : '' }`} onClick={() => this.onChangeTab(true)}>Favourites</div>
            </div>
            <div className="list">
              {displayMovies.map((movie,index) => (
                <MovieCard 
                  movie={movie} 
                  key={movies.imdbID}
                  dispatch={this.props.dispatch}
                  isFavourite = {this.isMovieFavourite(movie)}
                 />
              ))}
            </div>
            {displayMovies.length ===0 ? <div className="no-movies">No movies to Display!</div> : null}
          </div>
        </div>
      );
        
    }
  }

  // class AppWrapper extends React.Component{
  //   render(){
  //     return(
  //       <StoreContext.Consumer>
  //         {(store) => <App store={store}/>}
  //       </StoreContext.Consumer>
  //     );
  //   }
  // }
  
  function callback(state) {
    return{
      movies: state.movies,
      search: state.movies,
    };
  }
    const connectedAppComponent = connect(callback)(App);
  

export default connectedAppComponent;
