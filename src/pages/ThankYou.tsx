import React from "react";
import { Button } from "@/components/ui/button";

const ThankYou = ({ 
  hasContinueCTA = true, 
  message = "You have successfully submitted your information." 
}: { 
  hasContinueCTA?: boolean; 
  message?: string; 
}) => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
      <p className="text-lg mb-6">{message}</p>
      
      {/* Conditionally render Continue the Application Button */}
      {hasContinueCTA && (
        <Button
          className="w-64 mb-6"
          onClick={() => {
            window.location.href = "/address-form"; // Replace with desired URL
          }}
        >
          Continue the Application
        </Button>
      )}

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