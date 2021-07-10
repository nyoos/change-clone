import "react-image-crop/dist/ReactCrop.css";
import ReactCrop from "react-image-crop";
import { useCallback, useEffect, useRef, useState } from "react";
import ActionButton from "../../components/ActionButton";
import autoprefixer from "autoprefixer";

export default function Photo({ photo, setPhoto, next }) {
  const [upImg, setUpImg] = useState(null);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", width: 50, aspect: 16 / 9 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const complete = () => {
    if (!(!completedCrop?.width || !completedCrop?.height)) {
      try {
        setIsLoading(true);
        next();
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    } else {
      setError("Please include a photo.");
    }
  };

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    previewCanvasRef.current.toBlob((blob) => {
      setPhoto(blob);
    });
  }, [completedCrop, setPhoto]);
  return (
    <div>
      <h1 className="text-3xl mb-2">Add a photo or video</h1>
      <p className="mb-4">
        Petitions with a photo or video receive <b> six times </b> more
        signatures than those without. Include one that captures the emotion of
        your story.
      </p>
      <div className="mx-3 pt-2">
        <div className="mx-auto w-full border border-gray-400 rounded p-2">
          <div className="flex justify-center">
            <ReactCrop
              src={upImg}
              onImageLoaded={onLoad}
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              imageStyle={{ "max-height": "500px" }}
            />
          </div>

          <div>
            <label
              htmlFor="file-upload"
              className="bg-theme-white border-2 border-gray-400 hover:border-gray-600 py-2 px-4 text-theme-black font-bold rounded-md
              block my-3 text-center md:w-max md:mx-auto"
            >
              Upload a picture
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={onSelectFile}
              className="hidden"
            />
          </div>
        </div>
        <div className="hidden">
          <canvas
            ref={previewCanvasRef}
            // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
            style={{
              width: Math.round(completedCrop?.width ?? 0),
              height: Math.round(completedCrop?.height ?? 0),
              margin: "auto",
            }}
          />
        </div>
        <p className="text-s text-red-800">{error}</p>
        <div className="md:flex md:justify-end md:mb-3">
          <ActionButton
            type="button"
            onClick={complete}
            styling="w-full mt-3 md:w-max"
            text="Submit"
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
