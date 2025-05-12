import React, { ReactNode } from 'react';

type BannerProps = {
  onClick(): void;
  onDrop(file: File): void;
  fileName?: string;
};

const BannerText = ({ children }: { children: ReactNode }) => (
  <p className="text-[1.5rem] text-[#ccc] block my-0.5">{children}</p>
);

const DropZoneBanner = ({ onClick, onDrop, fileName }: BannerProps) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onDrop(e.dataTransfer.files[0]);
  };

  return (
    <div
      className="flex flex-col items-center justify-center bg-gray-700 cursor-pointer h-[200px] w-full mb-4"
      onClick={onClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {fileName ? (
        <>
          <BannerText>File to upload</BannerText>
          <BannerText>{fileName}</BannerText>
        </>
      ) : (
        <>
          <BannerText>Click to Add file </BannerText>
          <BannerText>Or</BannerText>
          <BannerText>Drag and Drop file</BannerText>
        </>
      )}
    </div>
  );
};

export default DropZoneBanner;
