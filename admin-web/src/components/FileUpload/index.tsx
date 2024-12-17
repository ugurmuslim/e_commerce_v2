import { useDropzone } from "react-dropzone";
import React, { useState } from "react";

const FileUpload = () => {
  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles, rejectedFiles) => {
    // Only handle accepted files
    const newFiles = acceptedFiles.map((file) => {
      const fileWithPreview = {
        file,
        preview: URL.createObjectURL(file), // Create a preview for the image
      };
      return fileWithPreview;
    });

    // Handle rejected files
    if (rejectedFiles.length > 0) {
      console.log("Rejected files:", rejectedFiles);
      alert("Some files were rejected because they are not valid images.");
    }

    // Update the state with the newly accepted files
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true, // Allow multiple files
    accept: "image/*", // Accept only image files
    noClick: false,
    noDragEventsBubbling: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, e.g., send the files to the server
    console.log(files);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            File upload
          </h3>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Attach file
            </label>
            <div
              {...getRootProps()}
              className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
            >
              <input {...getInputProps()} />
              <p>Drag and drop your files here, or click to select</p>
            </div>
          </div>

          {files.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-black dark:text-white">
                Selected Files:
              </h4>
              <div className="flex gap-4">
                {files?.map((fileWithPreview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={fileWithPreview.preview}
                      alt={`file-${index}`}
                      className="h-16 w-16 rounded-md object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFiles((prevFiles) =>
                          prevFiles.filter((_, i) => i !== index),
                        );
                      }}
                      className="absolute right-0 top-0 text-xs text-red-500"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="mt-4 rounded bg-primary px-4 py-2 text-white"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default FileUpload;
