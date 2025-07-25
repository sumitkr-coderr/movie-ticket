import { createSlice } from '@reduxjs/toolkit';

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    items: []
  },
  reducers: {
    addTicket: (state, action) => {
      state.items.push(action.payload);
    },
   removeTicket: (state, action) => {
  state.items = state.items.filter(ticket => ticket.id !== action.payload);
  localStorage.setItem('tickets', JSON.stringify(state.items));
}
  }
});

export const { addTicket, removeTicket } = ticketsSlice.actions;
export default ticketsSlice.reducer;