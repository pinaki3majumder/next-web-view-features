"use client";

import { Post } from "@/models/dummy-loans.types";
import { RootState } from "@/store/store";
import { useParams } from "next/navigation";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

const LoanDetailsPage = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // const [captured, setCaptured] = useState(false);

  const data = useSelector((state: RootState) => state.loan);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const router = useParams();

  const [error, setError] = useState("");

  const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
  const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(""); // Reset error

    setSelectedFile(null);
    setPreviewUrl(null);

    const file = e.target.files?.[0];
    if (!file) return;

    // ✅ Check file type
    if (!allowedTypes.includes(file.type)) {
      setError("Invalid format. Accepted: PDF, JPEG, PNG.");
      return;
    }

    // ✅ Check file size
    if (file.size > maxSizeInBytes) {
      setError("File size is too large. Max limit: 10 MB.");
      return;
    }

    // ✅ Success
    setError("");
    console.log("Valid file selected:", file);

    // Set file and preview
    setSelectedFile(file);
    if (file.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCapture = () => {
    console.log("Capturing screenshot...");

    const target = document.getElementById("screenshot-target");
    const canvas = canvasRef.current;

    if (!target || !canvas) return;

    // Get the size of the target element
    const { width, height } = target.getBoundingClientRect();

    // Set canvas size to match target
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ✅ Get the target's background color
    const computedStyle = getComputedStyle(target);
    const backgroundColor = computedStyle.backgroundColor || "#ffffff";

    // ✅ Fill canvas with the target background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#000000";
    ctx.font = "16px Arial";

    // Capture text content of div and render on canvas
    const lines = target.innerText.split("\n");
    lines.forEach((line, i) => {
      ctx.fillText(line, 10, 30 + i * 25);
    });

    // setCaptured(true);

    // Convert to data URL
    const image = canvas.toDataURL("image/png");

    // Create link to download
    const link = document.createElement("a");
    link.download = "screenshot.png";
    link.href = image;
    link.click();
  };

  return (
    <div>
      <div className="bg-violet-200 p-2" id="screenshot-target">
        <button onClick={() => history.back()}>BACK</button>
        <br />
        LoanDetailsPage
        <br />
        Last Segment: {router.id}
        <br />
        Title: {(data?.value as Post[])[0]?.title || "No Title"}
        <br />
        <br />
        <input
          type="file"
          name=""
          id=""
          className="border-1 border-black p-4"
          onChange={handleFileChange}
        />
        <p className="text-sm text-gray-600 mt-2">
          Accepted: PDF, JPEG, PNG. Max size: 10 MB
        </p>
        {error && <p className="text-red-500 font-medium mt-2">{error}</p>}
        {selectedFile && (
          <div className="mt-4 p-3 border border-gray-300 rounded bg-gray-50">
            <p className="text-sm font-semibold">Uploaded File:</p>
            <p className="text-blue-700">{selectedFile.name}</p>

            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mt-2 max-w-full max-h-60 border rounded shadow"
              />
            )}

            {!previewUrl && selectedFile.type === "application/pdf" && (
              <p className="mt-2 text-sm text-gray-700">
                📄 PDF file selected (no preview)
              </p>
            )}
          </div>
        )}
      </div>

      <br />
      <br />
      <br />
      <br />

      {/* 🎯 Button to Trigger "Screenshot" */}
      <button
        onClick={handleCapture}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Capture Screenshot & download
      </button>

      {/* 🖼️ Canvas Output */}
      {/* {captured && ()} */}
      <div>
        <h3 className="text-lg font-semibold mt-4">Captured Canvas</h3>
        <canvas ref={canvasRef} className="border border-gray-400 mt-2" />
      </div>
    </div>
  );
};

export default LoanDetailsPage;
