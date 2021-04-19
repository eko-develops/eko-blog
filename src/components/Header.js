import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <span className="brand">eko blog</span>
            <nav>
                <ul>
                    <li>
                        {/* Using anchor tags will cause the application to refresh
                        and send a request back to the server.
                        To stop the request back to the server, we use the Link component. */}
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/create">Create Blog</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
