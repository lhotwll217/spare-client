import React, {useRef} from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

export default function MyCropper({src, setImage}) {
  const cropperRef = useRef(null);

  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setImage(cropper.getCroppedCanvas());
  };

  return (
    <Cropper
      src={src}
      style={{height: 200, width: "100%"}}
      aspectRatio={1}
      viewMode={2}
      guides={false}
      crop={onCrop}
      scalable={false}
      ref={cropperRef}
      background={false}
      preview='.img-preview'

      //   cropend={}
    />
  );
}
