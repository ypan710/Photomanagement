import React, {Component} from 'react';
import axios from 'axios';
import ImageCard from '../components/ImageCard';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            title: 'Image Search',
            searchTerm: '',
            results: []
        };
    }

    // change the search term
    searchTermChanged = (ev) => {
        console.log(ev.target.value);
        this.setState({searchTerm: ev.target.value})
    }

    // display all stored images in database when page loads
    componentWillMount = () => {
        this.fetchImages();
    }

    // get the image from search
    fetchImages = (e) => {
        if (e) {
            e.preventDefault();
        }
        axios.get(`http://localhost:5500/post?title=${
            this.state.searchTerm
        }`).then(res => {
            this.setState({results: res.data});
        });
    }

    render() {
        return (
            <div>
                <h1>Image Search</h1>
                <form onSubmit={
                    this.fetchImages
                }>
                    <label htmlFor="searchTerm">Search Image:
                    </label>
                    <input onChange={
                            (ev) => this.searchTermChanged(ev)
                        }
                        value={
                            this.state.searchTerm
                        }
                        className="u-full-width"
                        type="text"
                        id="searchTerm"
                        name="searchTerm"/>
                    <button type="submit">
                        Search
                    </button>
                </form>
                <div> {
                    this.state.results.map(result => {
                        return (
                            <ImageCard key={
                                    result._id
                                }
                                {...result}></ImageCard>
                        )
                    })
                } </div>
            </div>
        );;;
    };
}

export default Home;
