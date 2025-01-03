import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CardWithForm } from "./pages/CardWithForm";
import ThankYou from "./pages/ThankYou";
import AddressForm from "./pages/AddressForm";
import { UserProvider } from "./context/UserContext"; // Import UserProvider
import { AuthCallback } from '@/components/AuthCallback';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CardWithForm />} />
          <Route path="/address-form" element={<AddressForm />} />
          <Route 
            path="/thank-you" 
            element={
              <ThankYou 
                hasContinueCTA={true} 
                message="You have successfully signed up."
              />
            } 
          />
          <Route 
            path="/final-thank-you" 
            element={
              <ThankYou 
                hasContinueCTA={false} 
                message="Thank you! Your submission is complete."
              />
            } 
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;