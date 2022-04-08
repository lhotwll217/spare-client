import React, {useCallback} from "react";
import {useDropzone} from "react-dropzone";
import {Icon} from "semantic-ui-react";
import imageCompression from "browser-image-compression";

export default function PhotoDropzone({setFiles}) {
  const dropzoneStyles = {
    border: "dashed 3px black",
    borderRadius: "5%",
    paddingTop: "30px",
    textAlign: "center",
    maxWidth: "33%",
    margin: "auto",
    padding: "1em",
  };

  const dropzoneActive = {
    border: "dashed 3px green",
  };

  const options = {
    maxWidthOrHeight: 200,
  };

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const compImage = await acceptedFiles.map((img) => {
        return imageCompression(img, options);
      });

      console.log(compImage);

      setFiles((previousValue) => [
        ...previousValue,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
    [setFiles]
  );
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  return (
    <div
      style={
        isDragActive ? {...dropzoneStyles, ...dropzoneActive} : dropzoneStyles
      }
      {...getRootProps()}
    >
      <input {...getInputProps()} />

      <Icon name='upload' size='huge' />
      <div>Click to upload or drag & drop</div>
    </div>
  );
}
