import ContactTable from '../components/ContactTable';
import Filter from '../components/Filter';
import Header from '../components/Header';
import Searchbar from '../components/Searchbar';

const Home = () => {
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='card'>
                            <Searchbar />
                            <Filter />
                            <ContactTable />
                        </div>
                    </div>
                </div>
            </div>
        </>
    ); // <--- And close it here
};

export default Home;
