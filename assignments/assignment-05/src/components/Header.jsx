import { Link } from 'react-router';

const Header = () => {
    return (
        <header>
            <nav className='navbar navbar-expand-lg navbar-light'>
                <div className='container'>
                    <Link className='navbar-brand text-uppercase' to='/'>
                        <strong>Contact</strong> App
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;
