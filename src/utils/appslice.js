import { createSlice } from "@reduxjs/toolkit";

const appslice = createSlice(
    {
        name:"app",
        initialState: {
            isMenuOpen:true
        },
        reducers : {
            toogleMenu: (state, action) => {
                state.isMenuOpen = !state.isMenuOpen;
            },
            closemenu: (state, action) => {
                state.isMenuOpen = false;
            }
        }
    }
)
export const {toogleMenu, closemenu} = appslice.actions
export default appslice.reducer