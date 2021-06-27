import React, { Component } from 'react'

export default class Searchcomp extends Component {

    render() {
        // console.log('props' , this.props);
        const {movie} = this.props
        console.log(movie);
        return (
            <div className='absolute top-12 p-4 bg-gray-100  w-[50%] left-48 flex justify-between'>
            <div className='flex'>
            <div className='ml-4'>
            <p>{movie.Title}</p>
         </div>
            </div>
            <button className= 'px-8 ' onClick={() =>this.handleAddToMovies(movie)}>Add to Movies</button>
        </div>
        )
    }
}
