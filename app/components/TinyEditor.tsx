"use client";
import { Card, Typography } from "@mui/material";
// import { Editor } from "@tinymce/tinymce-react";
import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  { ssr: false }
);

const TinyEditor = () => {
  return (
    <Card>
      <Typography sx={{ textAlign: "center" }}>My Text Editor</Typography>
      <Editor
        apiKey="5c33k5b07sv641fowcz0lbxkwhx98kt8cdcwikpzehpj0b3h"
        initialValue=""
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "lists",
            "link",
            "image",
            "code",
            "media",
            "table",
            "autolink",
            "codesample",
            "advcode",
          ],
          toolbar:
            "undo redo | blocks | bold italic underline strikethrough | align bullist numlist | table blockquote | link | image media | forecolor | codesample code ",
        }}
      />
    </Card>
  );
};

export default TinyEditor;
