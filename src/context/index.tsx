import { createContext, useState } from "react";

export interface UserType {
  uid: string;
  [x: string]: any;
}

export interface LetterType {
  id: string;
  content: string;
}

export const emptyUser = {
  user: {
    uid: "",
  },
  setUser: (user: UserType) => {},
};

const emptyLetters: Array<LetterType> = [];

export const UserContext = createContext(emptyUser);

export const ContextProvider = (props: any) => {
  const setUser = (user: UserType) => {
    setState({ ...state, user });
  };

  const initState = {
    ...emptyUser,
    setUser,
  };
  const [state, setState] = useState(initState);

  return (
    <UserContext.Provider value={state}>{props.children}</UserContext.Provider>
  );
};
