import React, { createContext, useReducer, useContext } from 'react';
import { Reducer } from './reducer';

export const ChecklistContext = createContext();

const ContextProvider = (props) => {
  const initialState = {
    listClinic: [],
  };

  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <ChecklistContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ChecklistContext.Provider>
  );
};

export const useChecklist = () => useContext(ChecklistContext);

export default ContextProvider;
