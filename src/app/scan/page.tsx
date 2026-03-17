"use client"

import React, { useState } from 'react';
import { CameraCapture } from '@/components/CameraCapture';
import { PredictionResult } from '@/components/PredictionResult';
import { NatureDecor } from '@/components/NatureDecor';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function ScanPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [capturedImageUrl, setCapturedImageUrl] = useState<string | null>(null);

  const handleCapture = async (blob: Blob) => {
    setIsProcessing(true);
    setResult(null);
    
    // Preview the image
    const url = URL.createObjectURL(blob);
    setCapturedImageUrl(url);

    try {
      const formData = new FormData();
      formData.append('image', blob);

      const response = await fetch('/api/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Prediction failed');

      const data = await response.json();
      setResult({ ...data, imageUrl: url });

      // Save to local storage for "History" (Simulating Firestore)
      const scanHistory = JSON.parse(localStorage.getItem('scanHistory') || '[]');
      scanHistory.unshift({
        ...data,
        id: Date.now(),
        imageUrl: url, // In production, this would be a Firebase Storage URL
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('scanHistory', JSON.stringify(scanHistory.slice(0, 20)));

    } catch (err) {
      console.error(err);
      alert("Something went wrong during analysis. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setCapturedImageUrl(null);
  };

  return (
    <div className="min-h-screen relative bg-background pb-12">
      <NatureDecor />
      
      <div className="container mx-auto px-6 py-8 relative z-10">
        <Link href="/" className="inline-flex items-center text-primary hover:underline mb-8 gap-1 font-medium">
          <ChevronLeft size={20} /> Back to Home
        </Link>

        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold font-headline mb-2">Identify Leaf Disease</h2>
          <p className="text-muted-foreground">Snap a clear photo of the top side of the leaf</p>
        </div>

        {!result ? (
          <CameraCapture onCapture={handleCapture} isProcessing={isProcessing} />
        ) : (
          <PredictionResult result={result} onReset={handleReset} />
        )}
      </div>
    </div>
  );
}
