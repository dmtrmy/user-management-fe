import React from "react";
import { Button } from "@/components/ui/button";

const ThankYou = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
      <p className="text-lg mb-6">You have successfully signed up.</p>
      
      {/* Continue the Application Button */}
      <Button
        className="w-64 mb-6" // Add mb-8 for larger spacing
        onClick={() => {
          window.location.href = "/address-form"; // Replace "/continue" with the desired URL
        }}
      >
        Continue the Application
      </Button>

      {/* Return Home Link */}
      <div>
        <a
          href="/"
          className="text-blue-600 hover:underline"
        >
          Return Home
        </a>
      </div>
    </div>
  );
};

export default ThankYou;