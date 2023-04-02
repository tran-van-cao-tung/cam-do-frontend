import { useState } from 'react';
import React from 'react';
import search from '../../asset/img/search.png';
import './CustomerManager.css';

const SearchBar = () => {
    // const [search, setSearch] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <div>
            <form className="customer_search">
                <div>
                    <input
                        type="text"
                        placeholder="I'm looking for...."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="customer_search-btn">
                    <span>Tìm kiếm </span>
                    <img src={search} alt="search" />
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
