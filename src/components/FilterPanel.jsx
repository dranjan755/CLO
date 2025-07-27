import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, resetFilters } from '../features/contentSlice';

const Panel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #000000;
  color: #ffffff;
  width: 100%;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 20px;
  
  label {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

export default function FilterPanel() {
  const dispatch = useDispatch();
  const { pricing } = useSelector((state) => state.content.filters);

  const handlePricingChange = (option) => {
    const updatedPricing = pricing.includes(option)
      ? pricing.filter((p) => p !== option)
      : [...pricing, option];

    dispatch(setFilters({ pricing: updatedPricing }));
  };

  return (
    <Panel>
      <FilterGroup>
        <label>
          <input
            type="checkbox"
            checked={pricing.includes('Paid')}
            onChange={() => handlePricingChange('Paid')}
          /> 
          Paid
        </label>
        <label>
          <input
            type="checkbox"
            checked={pricing.includes('Free')}
            onChange={() => handlePricingChange('Free')}
          /> 
          Free
        </label>
        <label>
          <input
            type="checkbox"
            checked={pricing.includes('View Only')}
            onChange={() => handlePricingChange('View Only')}
          /> 
          View Only
        </label>
      </FilterGroup>
      <button onClick={() => dispatch(resetFilters())}>Reset</button>
    </Panel>
  );
}
