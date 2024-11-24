"use client";

import { useState } from 'react';

export function useUploadProgress() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleProgress = (progress: number) => {
    setUploadProgress(progress);
    setIsUploading(progress < 100);
  };

  return {
    uploadProgress,
    isUploading,
    handleProgress
  };
}