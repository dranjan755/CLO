import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, resetFilters } from '../features/contentSlice';

const Panel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;           
  padding: 0px 15px;
  background: #000000;            
  color: #ffffff;
  width: 100%;           
  border-radius: 4px;
  font-size: 0.95rem;
  box-sizing: border-box;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 20px; 
  label {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
  }

  input[type='checkbox'] {
    accent-color: ${({ theme }) => theme.colors.accent};
  }
`;

const ResetButton = styled.button`
  padding: 5px 12px;
  background: transparent;
  color: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    border-color: ${({ theme }) => theme.colors.accent};
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
      <ResetButton onClick={() => dispatch(resetFilters())}>Reset</ResetButton>
    </Panel>
  );
}
