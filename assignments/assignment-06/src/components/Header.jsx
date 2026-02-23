import Logo from './Logo';
import Navbar from './Navbar';

const Header = () => {
    return (
        <header className='sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                    <div className='shrink-0'>
                        <Logo />
                    </div>

                    <Navbar />
                </div>
            </div>
        </header>
    );
};

export default Header;
