import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  taxOrganizationStatus?: string;
  maxDocsAllowed?: number;
};

interface InitialState {
  value: User | null;
}

const initialState: InitialState = {
  value: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    taxOrganizationStatus: "",
    maxDocsAllowed: 0,
  },
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<User | null>) => {
      state.value = action.payload;
    },
  },
});

export const { setUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
