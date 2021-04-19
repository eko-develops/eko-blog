import { useState, useEffect } from 'react'

//Custom hooks in react have to start with "use"
const useFetch = (url) => {

    //Sets the state of the component and declares function used to
    //change state
    const [data, setData] = useState(null);

    const [isPending, setIsPending] = useState(true);

    const [error, setError] = useState(null);

    // This hook runs on every render of a component
    // Useful for running any code that needs to be run at every render
    // Used for things like fetching data
    // Having an empty array as a second argument for the hook only runs code on initial render
    // When there is a value in the second argument, the hook will run when that dependencies state changes
    useEffect( () => {

        //Abort controller for cleaning up after component is unmounted.
        //We need to associate the abort controller with a fetch.
        const abortController = new AbortController();
        setTimeout(() => {
            //Associate the abortController with the fetch.
            //Assign the signal property as the second argument in fetch
            fetch(url, { signal: abortController.signal })
            .then ( (response) => {
                //Check if we are getting any data back. 
                //If data is requested from an endpoint that doens't exist
                if(!response.ok){
                    throw Error('ERROR: Unable to fetch data');
                } 
                return response.json();
            })
            .then ( (data) => {
                setIsPending(false);
                setData(data);
                setError(null);
            })
            .catch( (err) => {
                //If the error name is AbortError, we do not want to update the state
                //but cancel the fetch request.
                if(err.name === 'AbortError') {
                    console.log("fetch aborted")
                } else {
                    //We still want to update the state if we get a network error or server error
                    setIsPending(false);
                    setError(err.message);
                }
            })
        }, 2000)

        //Aborts whatever fetch is associated with the abort controller.
        return () => abortController.abort();
        //Set url as a dependency so when the url changes, it will re-run the useEffect
    }, [url]);

    //You can return a string, boolean, array, object
    return { data , isPending, error};
}

export default useFetch
