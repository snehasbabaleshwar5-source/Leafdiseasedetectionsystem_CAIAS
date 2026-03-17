"use client"

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Camera, Upload, RotateCcw, Check, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface CameraCaptureProps {
  onCapture: (imageBlob: Blob) => void;
  isProcessing: boolean;
}

export function CameraCapture({ onCapture, isProcessing }: CameraCaptureProps) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraActive(false);
  }, [stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      setStream(mediaStream);
      setHasCameraPermission(true);
      setIsCameraActive(true);
      setPreviewUrl(null);

      // We use a small timeout to ensure the video element is rendered if it was conditional,
      // though the guide recommends keeping it in the DOM.
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setHasCameraPermission(false);
      toast({
        variant: 'destructive',
        title: 'Camera Access Denied',
        description: 'Please enable camera permissions in your browser settings to use this app.',
      });
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(videoRef.current, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setPreviewUrl(url);
          stopCamera();
        }
      }, 'image/jpeg', 0.8);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      stopCamera();
    }
  };

  const reset = () => {
    setPreviewUrl(null);
    setIsCameraActive(false);
    stopCamera();
  };

  const handleSubmit = () => {
    if (previewUrl) {
      fetch(previewUrl)
        .then(res => res.blob())
        .then(blob => onCapture(blob));
    }
  };

  return (
    <Card className="p-4 md:p-6 w-full max-w-2xl mx-auto shadow-xl bg-white/80 backdrop-blur-md border-primary/20">
      <div className="relative aspect-[4/3] bg-muted rounded-xl overflow-hidden mb-6 border-2 border-dashed border-primary/20 flex items-center justify-center">
        {/* Always show video tag irrespective of hasCameraPermission to prevent race condition */}
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            isCameraActive ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"
          )}
        />

        {!isCameraActive && previewUrl && (
          <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
        )}

        {!isCameraActive && !previewUrl && (
          <div className="text-center p-6">
            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="text-primary w-10 h-10" />
            </div>
            <p className="text-muted-foreground">Capture or upload a clear photo of the infected leaf</p>
          </div>
        )}

        {hasCameraPermission === false && isCameraActive && (
          <div className="absolute inset-0 flex items-center justify-center p-6 bg-background/80">
            <Alert variant="destructive" className="max-w-xs">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Camera Access Required</AlertTitle>
              <AlertDescription>
                Please allow camera access to use this feature.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {isProcessing && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
              <p className="font-medium">Analyzing Leaf...</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {!previewUrl && !isCameraActive && (
          <>
            <Button size="lg" onClick={startCamera} className="gap-2 rounded-full px-8">
              <Camera size={20} /> Open Camera
            </Button>
            <Button size="lg" variant="outline" onClick={() => fileInputRef.current?.click()} className="gap-2 rounded-full px-8">
              <Upload size={20} /> Upload File
            </Button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileUpload}
            />
          </>
        )}

        {isCameraActive && (
          <div className="flex gap-3">
             <Button size="lg" variant="outline" onClick={reset} className="rounded-full px-6">
              Cancel
            </Button>
            <Button size="lg" onClick={captureImage} className="gap-2 rounded-full px-8 bg-primary hover:bg-primary/90">
              Capture Photo
            </Button>
          </div>
        )}

        {previewUrl && !isProcessing && (
          <>
            <Button size="lg" variant="outline" onClick={reset} className="gap-2 rounded-full px-6">
              <RotateCcw size={18} /> Retake
            </Button>
            <Button size="lg" onClick={handleSubmit} className="gap-2 rounded-full px-10 bg-accent text-accent-foreground hover:bg-accent/90">
              <Check size={18} /> Analyze Leaf
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}
