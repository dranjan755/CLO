import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://closet-recruiting-api.azurewebsites.net/api/data';

// Map numeric pricingOption values to labels
const mapPricing = (option) => {
  if (option === 0) return 'Paid';
  if (option === 1) return 'Free';
  if (option === 2) return 'View Only';
  return '';
};

// Async thunk to fetch content data
export const fetchContents = createAsyncThunk(
  'content/fetchContents',
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    items: [],
    filteredItems: [],
    status: 'idle',
    filters: { pricing: [], keyword: '' }, // pricing = [], keyword = "" means show all
  },
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      const keyword = state.filters.keyword?.toLowerCase() || '';
      const pricingFilters = state.filters.pricing;

      state.filteredItems = state.items.filter(item => {
        const title = item?.title?.toLowerCase() || '';
        const userName = item?.userName?.toLowerCase() || '';
        const pricingLabel = mapPricing(item?.pricingOption);

        // Keyword filter
        const matchesKeyword =
          title.includes(keyword) || userName.includes(keyword);

        // Pricing filter
        const matchesPricing =
          pricingFilters.length === 0 || pricingFilters.includes(pricingLabel);

        return matchesKeyword && matchesPricing;
      });
    },
    resetFilters(state) {
      state.filters = { pricing: [], keyword: '' };
      state.filteredItems = state.items;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload || [];
        state.filteredItems = action.payload || [];
      })
      .addCase(fetchContents.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setFilters, resetFilters } = contentSlice.actions;
export default contentSlice.reducer;
