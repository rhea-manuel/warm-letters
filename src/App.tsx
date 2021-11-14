import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignInScreen } from "./components/Auth";
import { Dashboard } from "./components/Dashboard";
// import { ContextProvider } from "./context";

import { QueryClient, QueryClientProvider } from "react-query";

import { Wrapper } from "./components/Wrapper";

import "./App.css";
import { useState } from "react";
import { Reply } from "./components/Reply";
import { Confirmation } from "./components/Confirmation";
import { ViewReplies } from "./components/ViewReplies";

export interface UserType {
  uid: string;
  [x: string]: any;
}

// export interface UserState {
//   user: UserType;
//   setUser: (user: any) => void;
// }

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Wrapper>
        <Router>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reply" element={<Reply />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/view-replies" element={<ViewReplies />} />
            <Route path="/" element={<SignInScreen />} />
          </Routes>
        </Router>
      </Wrapper>
    </QueryClientProvider>
  );
}
