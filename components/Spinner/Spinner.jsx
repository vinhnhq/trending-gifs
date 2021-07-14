import React from "react";

export default function Spinner({ isLoading = false }) {
  if (!isLoading) return null;
  return <div>loading</div>;
}
