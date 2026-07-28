import React, { useEffect, useState } from "react";

const ChangePhotoModal = ({
  isOpen,
  onClose,
  currentImage,
  onUpload,
}) => {

  const [preview, setPreview] = useState(currentImage);
  const [image, setImage] = useState(null);

  useEffect(() => {
    setPreview(currentImage);
  }, [currentImage]);

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = () => {

    if (!image) return;

    onUpload(image);

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl p-6 w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6">
          Change Profile Picture
        </h2>

        <div className="flex justify-center mb-6">

          <img
            src={preview}
            alt=""
            className="w-36 h-36 rounded-full object-cover border-4 border-indigo-500"
          />

        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="border px-5 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
          >
            Upload
          </button>

        </div>

      </div>

    </div>
  );
};

export default ChangePhotoModal;