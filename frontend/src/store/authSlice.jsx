import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loggedInDetail: {},
        isLoggedIn: false,
        loggedInToken: "",

    },
    reducers: {
        login(state, action) {
            const tokens = (action.payload)
            // const refresh = (action.payload).refresh
            state.isLoggedIn = true;
            state.loggedInToken = tokens.access;
            state.loggedInDetail = {
                'id': jwtDecode(tokens.access).id,
                'email': jwtDecode(tokens.access).email,
                'username': jwtDecode(tokens.access).username,
                'exp': jwtDecode(tokens.access).exp,
                'firstname': jwtDecode(tokens.access).first_name,
                'lastname': jwtDecode(tokens.access).last_name,
                'phone': jwtDecode(tokens.access).phone,
                'address': jwtDecode(tokens.access).address,
                'date_joined': jwtDecode(tokens.access).date_joined
            }
            
        },
        refresh(state, action) {
            const access = (action.payload).access
            state.loggedInToken = access
        },
        logout(state, action) {
            state.isLoggedIn = false;
            state.numberOfLoggedIn -= 1;
            state.loggedInDetail1 = {};
            state.loggedInToken = null
            }
    }
})


export default authSlice;
