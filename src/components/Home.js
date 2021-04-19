// import { useState, useEffect } from 'react';
import BlogList from './BlogList';
import useFetch from '../hooks/useFetch';

//npx json-server --watch [file-location] --port [port #]

const Home = () => {

    // const deleteBlog = (id) => {
    //     const newBlogs = blogs.filter( blog => blog.id !== id );
    //     setBlogs(newBlogs);
    // }

    const { data: blogs, isPending, error } = useFetch('http://localhost:8000/blogs');

    return (
        <div className="home">
            <div className="hero-container">
                <h1>SPA Created with React</h1>
            </div>
            {/* Dynamic Checking, Conditional Templating in React:
            We do not want to display the blogs until we have the data 
            Evaluates the left first, if it is false, then it will not
            run the code on the right*/}
            {isPending && <div>Loading ...</div>}
            {blogs && <BlogList blogs={blogs} title="All Blogs"/>}
            {error && <div>Error fetching data...</div>}
        </div>
    );
}

export default Home
