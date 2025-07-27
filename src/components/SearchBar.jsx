import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setFilters } from '../features/contentSlice';

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 1rem;
  background-color: #000000; /* Jet black background */
  color: #ffffff; /* Light text color */

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    outline: none;
  }

  &::placeholder {
    color: #888888; /* Light gray placeholder */
  }
`;

export default function SearchBar() {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(setFilters({ keyword: e.target.value }));
  };

  return <Input type="text" placeholder="Search by name or title..." onChange={handleSearch} />;
}
