"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { FileIcon, UploadCloudIcon, CheckCircle2Icon } from 'lucide-react';

interface PDFUploaderProps {
  name: string;
  required?: boolean;
  onProgress?: (progress: number) => void;
}

export function PDFUploader({ name, required = false, onProgress }: PDFUploaderProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setIsUploading(true);
    setUploadProgress(0);

    // Create a new FileReader to track upload progress
    const reader = new FileReader();
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(progress);
        onProgress?.(progress);
      }
    };
    
    reader.onload = () => {
      setIsUploading(false);
      setUploadProgress(100);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="space-y-4">
      <Label className="font-serif text-2xl">Upload PDF</Label>
      
      <div className="border-2 border-dashed rounded-lg p-6 relative">
        <Input
          type="file"
          name={name}
          accept="application/pdf"
          onChange={handleFileChange}
          required={required}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="text-center space-y-4">
          {!selectedFile ? (
            <>
              <UploadCloudIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="text-sm text-gray-600">
                Drop your PDF here or click to browse
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <FileIcon className="h-6 w-6 text-blue-500" />
              <span className="text-sm font-medium">{selectedFile.name}</span>
            </div>
          )}
        </div>
      </div>

      {isUploading && (
        <div className="space-y-2">
          <Progress value={uploadProgress} className="w-full" />
          <div className="text-sm text-gray-600 text-center">
            Processing... {uploadProgress}%
          </div>
        </div>
      )}

      {uploadProgress === 100 && !isUploading && (
        <div className="flex items-center justify-center space-x-2 text-green-600">
          <CheckCircle2Icon className="h-5 w-5" />
          <span className="text-sm font-medium">Ready to upload!</span>
        </div>
      )}
    </div>
  );
}