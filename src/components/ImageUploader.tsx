import { Box, Typography } from "@mui/material";
import { Plus } from "lucide-react";

type ImageUploadProps = {
  onImageSelect: (file: File) => void;
  mode: "light" | "dark";
};

const ImageUploader = ({ onImageSelect, mode }: ImageUploadProps) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      onImageSelect(file);
    }
  };

  const handleClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        onImageSelect(file);
      }
    };
    input.click();
  };

  return (
    <Box
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      sx={{
        border: "2px dashed",
        borderColor: mode === "dark" ? "#374151" : "#d1d5db",
        borderRadius: 1,
        height: 300,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        mb: 2,
        "&:hover": {
          borderColor: "primary.main",
        },
      }}
    >
      <Plus size={24} color={mode === "dark" ? "#6B7280" : "#9CA3AF"} />
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Add Image
      </Typography>
    </Box>
  );
};

export default ImageUploader;
