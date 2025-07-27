import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContents } from '../features/contentSlice';
import ContentCard from '../components/ContentCard';
import FilterPanel from '../components/FilterPanel';
import SearchBar from '../components/SearchBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import Header from '../components/Header';

const PageWrapper = styled.div`
  padding: 0; /* Header remains full width with no padding */
`;

const ContentWrapper = styled.div`
  padding: 10px; /* Everything below header gets 10px padding */
`;
const FilterSection = styled.div`
  background: #000000;
  padding: 10px;
  border-radius: 4px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 10px 0; /* Slight spacing inside grid */

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export default function StorePage() {
  const dispatch = useDispatch();
  const { filteredItems, status } = useSelector((state) => state.content);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [itemsPerPage] = useState(20);

  useEffect(() => {
    dispatch(fetchContents());
  }, [dispatch]);

  useEffect(() => {
    setDisplayedItems(filteredItems.slice(0, itemsPerPage));
  }, [filteredItems]);

  const fetchMoreData = () => {
    setDisplayedItems((prev) => [
      ...prev,
      ...filteredItems.slice(prev.length, prev.length + itemsPerPage),
    ]);
  };

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <PageWrapper>
      <Header />
      <ContentWrapper>
        <SearchBar />
        <FilterSection>
          <FilterPanel />
        </FilterSection>
        <InfiniteScroll
          dataLength={displayedItems.length}
          next={fetchMoreData}
          hasMore={displayedItems.length < filteredItems.length}
          loader={<h4>Loading...</h4>}
        >
          <Grid>
            {displayedItems.map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </Grid>
        </InfiniteScroll>
      </ContentWrapper>
    </PageWrapper>
  );
}
