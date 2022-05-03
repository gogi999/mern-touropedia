import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import { getTours, setCurrentPage } from '../redux/features/tourSlice';
import CardTour from '../components/CardTour';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const { tours, loading, currentPage, numberOfPages } = useSelector((state) => ({ ...state.tour }));
    const location = useLocation();
    const dispatch = useDispatch();
    const query = useQuery();
    const searchQuery = query.get('searchQuery');

    useEffect(() => {
        dispatch(getTours(currentPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    if (loading) {
        return <Spinner />
    }

    return (
        <div
            style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "1000px",
                alignContent: "center",
            }}
        >
            <MDBRow className="mt-5">
                {tours.length === 0 && location.pathname === "/" && (
                    <MDBTypography 
                        className="text-center mb-0" 
                        tag="h2"
                    >
                        No Tours Found!
                    </MDBTypography>
                )}
                {tours.length === 0 && location.pathname !== "/" && (
                    <MDBTypography 
                        className="text-center mb-0" 
                        tag="h2"
                    >
                        We couldn't find any matches for "{searchQuery}"!
                    </MDBTypography>
                )}
                <MDBCol>
                    <MDBContainer>
                        <MDBRow className="row-cols-1 row-cols-md-3 g-3">
                            {tours && tours.map((item) => (
                                <CardTour 
                                    key={item._id} 
                                    { ...item } 
                                />
                            ))}
                        </MDBRow>
                    </MDBContainer>
                </MDBCol>
            </MDBRow>
            {tours.length > 0 && (
                <Pagination 
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    numberOfPages={numberOfPages}
                    dispatch={dispatch}
                />
            )}
        </div>
    );
}

export default Home;
