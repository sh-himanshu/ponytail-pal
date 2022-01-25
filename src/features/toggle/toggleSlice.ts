import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const toggleInitialState = {
  isLoading: true,
  popUp: { show: false, date: undefined as undefined | string },
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState: toggleInitialState,
  reducers: {
    openPopUp: (
      { isLoading },
      {
        payload: date,
      }: PayloadAction<typeof toggleInitialState["popUp"]["date"]>
    ) => {
      return {
        isLoading,
        popUp: { show: true, date },
      };
    },
    closePopUp: (state) => {
      return {
        ...state,
        popUp: { show: false, date: state.popUp.date },
      };
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      return { ...state, isLoading: payload };
    },
    resetAll: () => toggleInitialState,
  },
});

export const { openPopUp, setLoading, closePopUp } = toggleSlice.actions;
export default toggleSlice.reducer;
