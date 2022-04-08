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
    maxWidthOrHeight: 600,
  };

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const compImage = await imageCompression(acceptedFiles[0], options);

      console.log(new File([compImage], compImage.name));

      const file = new File([compImage], compImage.name);
      console.log(acceptedFiles[0]);

      setFiles((previousValue) => [
        ...previousValue,

        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
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
