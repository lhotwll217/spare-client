import React, {useCallback} from "react";
import {useState} from "react";
import {useDropzone} from "react-dropzone";
import {Icon} from "semantic-ui-react";

export default function MyDropzone() {
  const [files, setFiles] = useState([]);

  const dropzoneStyles = {
    border: "dashed 3px #eee",
    borderRadius: "5%",
    paddingTop: "30px",
    textAlign: "center",
  };

  const dropzoneActive = {
    border: "dashed 3px green",
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
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
    </div>
  );
}
