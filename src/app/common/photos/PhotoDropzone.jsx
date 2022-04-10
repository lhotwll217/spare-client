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
      Promise.all(
        acceptedFiles.map((file) => {
          return imageCompression(file, options);
        })
      ).then((blobArray) => {
        const fileArray = blobArray.map((blob) => {
          return new File([blob], blob.name);
        });
        console.log(fileArray[0]);
        setFiles((previousValue) => [
          ...previousValue,
          ...fileArray.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          ),
        ]);
      });

      // console.log(new File([compImage], compImage.name));

      // const file = new File([compImage], compImage.name);
      // console.log(acceptedFiles[0]);

      // setFiles((previousValue) => [
      //   ...previousValue,

      //   Object.assign(file, {
      //     preview: URL.createObjectURL(file),
      //   }),
      // ]);
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
