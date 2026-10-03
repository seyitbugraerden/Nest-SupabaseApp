"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    fetch("http://localhost:3000/api/health")
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
      })
      .catch((err) => {
        console.error(err);
        setStatus("error");
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to the Web App</h1>
      <p className="mt-4 text-lg">
        API Status:{" "}
        <span
          className={`font-semibold ${
            status === "ok"
              ? "text-green-600"
              : status === "error"
                ? "text-red-600"
                : "text-gray-600"
          }`}
        >
          {status}
        </span>
      </p>
    </main>
  );
}
