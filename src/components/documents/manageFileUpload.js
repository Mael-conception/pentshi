import { getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";

const manageFileUpload = async (
    fileBlob, fileType, file, 
    { onStart, onProgress, onComplete, onFail }
) => {

    const storage = getStorage();

    const storageRef = ref(storage, `/documents/${+ new Date().getTime() + file.name}`);

    console.log("uploading file");

    // Create file metadata including the content type
    const metadata = {
        contentType: fileType,
    };

    // Trigger file upload start event
    onStart && onStart();
    const uploadTask = uploadBytesResumable(storageRef, fileBlob, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
        "state_changed",
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            // Monitor uploading progress
            onProgress && onProgress(Math.fround(progress).toFixed(2));
        },
        (error) => {
            // Something went wrong - dispatch onFail event with error  response
            onFail && onFail(error);
        },
        () => {
            // Upload completed successfully, now we can get the download URL

            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                // dispatch on complete event
                onComplete && onComplete(downloadURL);

                console.log("File available at", downloadURL);
            });
        }
    );
};

export default manageFileUpload;