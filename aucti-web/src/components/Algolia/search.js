import React from 'react';
import algoliasearch from 'algoliasearch'
import { InstantSearch, SearchBox, Hits, Highlight, Stats, SortBy, Pagination } from 'react-instantsearch-dom';


//'YourApplicationID', 'YourSearchOnlyAPIKey'
const searchClient = algoliasearch("DZTA0M5OD8", "bfcc29ed9a87db03544730c93ed22ac2")

function Search () {            
        return (
            <InstantSearch searchClient={searchClient} indexName="aucti_products">
            <Header />
            <div className="body-content">
                <Content/>
            </div>
            </InstantSearch>
          );
}


const Header = () => (
    <header className="header">
        <SearchBox
            className="search-bar"
            translations={{ placeholder: 'Search for Movies' }}
        />
    </header>
);
const Hit = ({ hit }) => (
    <a href={"/"} >
        <h1>{JSON.stringify(hit)}</h1>
     </a>   
       
);
const Content = () => (
    <main>
        <div className="information">
            <div className="stats"> <Stats/> </div>
            <div className="">
            
            </div>
        </div>
        <Hits hitComponent={Hit} />
        <div> <Pagination/></div>
    </main>
);

export default Search;