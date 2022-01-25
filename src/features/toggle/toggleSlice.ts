import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { format } from "date-fns";

export const toggleInitialState = {
  isLoading: true,
  popUp: { show: false, date: undefined as undefined | string },
  seletedDay: format(new Date(), "dd-MM-yyyy"),
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
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      return { ...state, isLoading: payload };
    },
    setSelectedDay: (state, { payload: seletedDay }: PayloadAction<string>) => {
      return { ...state, seletedDay };
    },
    resetAll: () => toggleInitialState,
  },
});

export const { openPopUp, setLoading, closePopUp, setSelectedDay } =
  toggleSlice.actions;
export default toggleSlice.reducer;
