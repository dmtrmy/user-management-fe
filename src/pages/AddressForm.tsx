import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import supabaseClient from "@/lib/supabaseClient";

const AddressForm = () => {
  const { userData, updateUserData } = useUserContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Ensure session validation before rendering
  useEffect(() => {
    const validateSession = async () => {
      try {
        const { data: { session } } = await supabaseClient.auth.getSession();

        if (!session) {
          console.warn("No session found, redirecting...");
          navigate("/signup");
          return;
        }

        const { user } = session;
        const email = user.email || "";
        const name = user.user_metadata?.full_name || email.split("@")[0];

        // Update context only if necessary
        if (!userData.name || !userData.email) {
          updateUserData({ name, email });
        }

        setLoading(false); // Allow rendering once session is validated
      } catch (error) {
        console.error("Error validating session:", error.message);
        navigate("/signup");
      }
    };

    validateSession();
  }, [navigate, updateUserData, userData]);

  // Prevent rendering during loading state
  if (loading) {
    return null; // Render nothing while loading
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const street = e.currentTarget.street?.value || "";
    const houseNumber = e.currentTarget.houseNumber?.value || "";
    const postalCode = e.currentTarget.postalCode?.value || "";
    const city = e.currentTarget.city?.value || "";

    const finalData = {
      name: userData.name || "",
      email: userData.email || "",
      street: street.trim(),
      house_number: houseNumber.trim(),
      postal_code: postalCode.trim(),
      city: city.trim(),
    };

    console.log("Final Data:", finalData);

    if (
      !finalData.name ||
      !finalData.email ||
      !finalData.street ||
      !finalData.house_number ||
      !finalData.postal_code ||
      !finalData.city
    ) {
      alert("All fields are required.");
      return;
    }

    try {
      const response = await fetch("https://user-management-0jfv.onrender.com/add-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${errorText}`);
      }

      alert("Address submitted successfully!");
      navigate("/thank-you");
    } catch (error) {
      console.error("Error submitting data:", error.message);
      alert("Failed to submit your address. Please try again.");
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Address Information</CardTitle>
        <CardDescription>Please fill in your address details below.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="street">Street</Label>
              <Input
                id="street"
                type="text"
                placeholder="Enter your street"
                defaultValue={userData.street || ""}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="houseNumber">House Number</Label>
              <Input
                id="houseNumber"
                type="text"
                placeholder="Enter your house number"
                defaultValue={userData.houseNumber || ""}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                type="text"
                placeholder="Enter your postal code"
                defaultValue={userData.postalCode || ""}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                type="text"
                placeholder="Enter your city"
                defaultValue={userData.city || ""}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddressForm;