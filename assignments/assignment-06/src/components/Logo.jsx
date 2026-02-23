import { Link } from 'react-router';

const Logo = () => {
    return (
        <div className='flex justify-between gap-2 items-center'>
            <div className='flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105 p-4'>
                <Link className='flex justify-center items-center' to='/'>
                    <img
                        src='/logo.svg'
                        alt='Logo'
                        className='w-14 h-14 object-contain'
                    />
                    <span className='text-2xl text-cyan-500 font-bold'>
                        DevZiaus
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default Logo;
