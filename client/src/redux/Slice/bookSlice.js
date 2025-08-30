import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name:"",
  author:"",
  year:"",
}

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    updateBook:(state,actions) => {
        const {name ,author,year}=actions.payload;
        if(year) state.name=name;
        if(author) state.author=author;
        if(year) state.year=year;
    }
  },
})


export const {  } = bookSlice.actions

export default bookSlice.reducer