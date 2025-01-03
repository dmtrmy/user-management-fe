import React from "react";
import { Card } from "../components/card"; // Correct import path for Card

export default function TestCard() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="p-4 bg-white shadow rounded-lg">
        <h2 className="text-xl font-bold mb-2">Hello, Card!</h2>
        <p>This is a simple Card component preview.</p>
      </Card>
    </div>
  );
}