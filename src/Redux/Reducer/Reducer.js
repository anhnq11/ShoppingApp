import { createSlice } from "@reduxjs/toolkit";

// Định nghĩa trạng thái ban đầu
const initialState = {
    user: null, // Thông tin người dùng đăng nhập
    isAuthenticated: false, // Trạng thái xác thực người dùng
    cartQuantity: 0
}

// Tạo một slice Redux
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Reducer để đặt thông tin người dùng khi đăng nhập thành công
        login: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.cartQuantity = action.payload;
        },
        // Reducer để đặt trạng thái xác thực người dùng khi đăng xuất
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
        updateCartQuantity: (state, action) => {
            // Cập nhật cartQuantity khi có sự thay đổi (ví dụ: lấy số lượng từ action.payload)
            state.cartQuantity = action.payload;
        },
    }
})

// Xuất các action creators
export const { login, logout, updateCartQuantity } = authSlice.actions;

// Selector để truy cập thông tin người dùng và trạng thái xác thực
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectCartQuantity = (state) => state.auth.cartQuantity;

// Xuất reducer mặc định của slice
export default authSlice.reducer;
