import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/NavBar';
import LoginPage from './pages/LoginPage/LoginPage';
import Homepage from './pages/Homepage/Homepage';
import BusinessPage from './pages/BusinessPage/BusinessPage';
import AddBusinessPage from './pages/AddBusinessPage/AddBusinessPage';
import StorePage from './pages/BusinessPage/StorePage';
import { initializeAxios } from './utils/axios';

type AppState = {
  // Tracks whether the user is signed in
  signedIn: boolean;
};

export class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    // Initialize the state with the user not signed in
    const token = localStorage.getItem('authToken');
    this.state = { signedIn: !!token };
    initializeAxios(this.setSignedIn);
  }

  // Function to update the signed-in state
  setSignedIn = (value: boolean) => {
    this.setState({ signedIn: value });
  };

  // Layout component to include the Navbar with nested routes
  NavbarLayout = () => (
    <>
      <Navbar /> {/* Always displays the Navbar */}
      <Outlet /> {/* Renders the content of nested routes */}
    </>
  );

  render() {
    return (
      <div>
        {this.state.signedIn ? (
          // If signed in, render the main application routes
          <BrowserRouter>
            <Routes>
              {/* Routes with the Navbar */}
              <Route element={<this.NavbarLayout />}>
                <Route path="/pages/Homepage" element={<Homepage />} />
                <Route path="/pages/BusinessPage" element={<BusinessPage />} />
                <Route path="/pages/StorePage/:shopId/:userId" element={<StorePage />} />
                <Route path="/pages/AddBusinessPage" element={<AddBusinessPage />} />
              </Route>

              {/* Routes without the Navbar */}

              {/* Redirect to Homepage by default */}
              <Route path="/" element={<Navigate to="/pages/Homepage" replace />} />
            </Routes>
          </BrowserRouter>
        ) : (
          // Pass setSignedIn to allow login.
          <LoginPage setSignedIn={this.setSignedIn} />
        )}
      </div>
    );
  }
}

export default App;
