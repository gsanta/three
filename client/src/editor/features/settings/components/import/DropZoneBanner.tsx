import React, { ReactNode } from 'react';
import { Box, Text } from '@chakra-ui/react';

type BannerProps = {
  onClick(): void;
  onDrop(file: File): void;
  fileName?: string;
};

const BannerText = ({ children }: { children: ReactNode }) => (
  <Text fontSize="1.5rem" color="#ccc" display="block" marginBlock="0.5">
    {children}
  </Text>
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
    <Box
      alignItems="center"
      bgColor="gray.700"
      cursor="pointer"
      display="flex"
      flexDir="column"
      h="200px"
      justifyContent="center"
      onClick={onClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      marginBottom="1rem"
      w="100%"
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
    </Box>
  );
};

export default DropZoneBanner;
