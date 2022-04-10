async function handleImageUpload(event) {
  const imageFile = event.target.files[0];
  console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
  console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);
    console.log(
      "compressedFile instanceof Blob",
      compressedFile instanceof Blob
    ); // true
    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

    await uploadToServer(compressedFile); // write your own logic
  } catch (error) {
    console.log(error);
  }
}

const onDrop = useCallback(
  async (acceptedFiles) => {
    const compImages = await imageCompression(acceptedFiles[0], options);

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
