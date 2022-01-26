import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { format } from "date-fns";

export const toggleInitialState = {
  popUp: { show: false, date: undefined as undefined | string },
  currentMonth: format(new Date(), "dd-MM-yyyy"),
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState: toggleInitialState,
  reducers: {
    openPopUp: (
      state,
      {
        payload: date,
      }: PayloadAction<typeof toggleInitialState["popUp"]["date"]>
    ) => {
      return {
        ...state,
        popUp: { show: true, date },
      };
    },
    closePopUp: (state) => {
      return {
        ...state,
        popUp: { show: false, date: state.popUp.date },
      };
    },

    setCurrentMonth: (
      state,
      { payload: currentMonth }: PayloadAction<string>
    ) => {
      return { ...state, currentMonth };
    },
    resetAll: () => toggleInitialState,
  },
});

export const { openPopUp, closePopUp, setCurrentMonth } = toggleSlice.actions;
export default toggleSlice.reducer;
