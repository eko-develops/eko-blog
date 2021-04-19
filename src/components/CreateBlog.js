import { useState } from 'react'

import { useHistory } from 'react-router-dom'

const CreateBlog = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Mario');

    //For loading message
    const [isPending, setIsPending] = useState(false);


    //The history object.
    //Allows us to redirect the user.
    const history = useHistory();


    const handleSubmit = (e) => {
        //Prevent the page from refreshing when submitting a form
        e.preventDefault();

        const blog = { title, body, author};
        //While the form is submitting, display a loading message
        setIsPending(true);

        setTimeout( () => {
            //Use the second argument in fetch to define the type of request we are sending
            fetch('http://localhost:8000/blogs', {
                method: "POST",
                headers: {
                    //Tells the server the type of content we are sending with this request
                    "Content-Type": "application/json"
                },
                //The actual data we are sending with this request.
                //Because the data is an object, we must parse it into a JSON string
                body: JSON.stringify(blog)
                } )
                .then ( () => {
                    //When fetch complete, we will hide the loading message
                    setIsPending(false);
                    //After the new blog is added, redirect back home
                    // history.go(-1);
                    history.push('/');
                    console.log("new blog added");
                })
                        }, 2000)

                    
         }// end handle submit

    return (
        <div className="create">
            <h2>Create a Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog Title</label>
                <input
                type="text"
                required
                value={title}
                // Use the onChange event to track the changes in the input field
                onChange={(e)=>setTitle(e.target.value)}
                ></input>
                 <label>Blog Body</label>
                <textarea
                required
                value={body}
                onChange={(e)=>setBody(e.target.value)}
                ></textarea>
                <label>Author</label>
                <select
                value={author}
                onChange={ (e) => setAuthor(e.target.value)}
                >
                    <option value="mario">Mario</option>
                    <option value="luigi">Luigi</option>
                </select>
                { !isPending && <button type="submit">Save Blog</button>}
                { isPending && <button disabled>Adding Blog..</button>}


                <p>{title}</p>
                <p>{body}</p>
                <p>{author}</p>


            </form>
        </div>
    )
}

export default CreateBlog
