"use client";

import { Box } from "@mui/material";
import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  { ssr: false }
);

const MyEditor = () => {
  return (
    <Box>
      <Editor
        apiKey="mbv50le5yqiwcywtyju2zyjy7yistknkhn9nmuov0dnjyo4t"
        initialValue=""
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "lists",
            "table",
            "link",
            "autolink",
            "image",
            "media",
            "codesample",
            "advcode",
          ],
          toolbar:
            "undo redo | blocks | bold italic underline strikethrough | align bullist numlist | table blockquote | link | image media | forecolor | codesample code",
        }}
      />
    </Box>
  );
};

export default MyEditor;
