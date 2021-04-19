//Allows us to grab the parameters from the route.
import { useParams, useHistory } from 'react-router-dom';

import useFetch from '../hooks/useFetch';

const BlogDetails = () => {

    //Get the parameter by destructing with the name given in the route.
    const { id } = useParams();
    const { data: blog, error, isPending} = useFetch(`http://localhost:8000/blogs/${id}`);

    //We want to redirect the user after deleting a blog
    const history = useHistory();


    const deleteBlog = () => {
        //Send a delete request to the server
        fetch(`http://localhost:8000/blogs/${blog.id}`, {
            method: "DELETE"
        })
        .then( () => {
            //Redirect to homepage after deleting blog
            history.push('/');
            console.log(`blog ${blog.id} deleted`);
        })
    }

    return (
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>Error fetching data...</div>}
            {blog && (
                <article>
                    <h2>
                        { blog.title }
                    </h2>
                    <p>Written by {blog.author}</p>
                    <div>
                        {blog.body}
                    </div>
                    <button type="button" onClick={deleteBlog}>Delete</button>
                </article>
            )}
        </div>
    )
}

export default BlogDetails
