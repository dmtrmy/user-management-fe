import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CardWithForm } from "./pages/CardWithForm";
import ThankYou from "./pages/ThankYou";
import AddressForm from "./pages/AddressForm";
import { UserProvider } from "./context/UserContext"; // Import UserProvider

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CardWithForm />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/address-form" element={<AddressForm />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;