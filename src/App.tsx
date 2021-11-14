import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignInScreen } from "./components/Auth";
import { Dashboard } from "./components/Dashboard";
// import { ContextProvider } from "./context";

import { QueryClient, QueryClientProvider } from "react-query";

import { Wrapper } from "./components/Wrapper";

import "./App.css";
import { useState } from "react";
import { UserType } from "./context";

export interface UserState {
  user: UserType;
  setUser: (user: any) => void;
}

const queryClient = new QueryClient();

export default function App() {
  const [user, setUser] = useState<UserType>({ uid: "" });
  return (
    <QueryClientProvider client={queryClient}>
      <Wrapper>
        <Router>
          <Routes>
            <Route
              path="/dashboard"
              element={<Dashboard user={user} setUser={setUser} />}
            />
            <Route
              path="/"
              element={<SignInScreen user={user} setUser={setUser} />}
            />
          </Routes>
        </Router>
      </Wrapper>
    </QueryClientProvider>
  );
}
