import toast from "react-hot-toast";
import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadFileToFirebase = async (
  file: File,
  folderName: string = "uploads"
): Promise<string> => {
  try {
    const uniqueFileName = `${folderName}/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, uniqueFileName);

    // Upload the file
    await uploadBytes(storageRef, file);

    // Get download URL
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error: any) {
    toast.error("File upload error", error);
    throw error;
  }
};
