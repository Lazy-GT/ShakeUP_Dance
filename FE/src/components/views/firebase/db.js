import { storage } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

// Create 업로드
export async function uploadFile(file, fileName) {
  const filesRef = ref(storage, "videos/" + fileName);
  const uploadTask = uploadBytesResumable(filesRef, file);

  uploadTask.on(
    "state_changed",
    null,
    (error) => {
      // Handle unsuccessful uploads
      console.error("실패사유는", error);
    },
    () => {
      // 얘를 넘겨주면될거같음 downloadURL => .js로
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        // axios로 post 요청??
      });
    }
  );
}

// Read 읽어오기 => firebase URL 을 Danddaloading.js에 return
export async function getFile(time) {
  const dataRef = ref(storage, "videos/" + time);
  const downloadURL = await getDownloadURL(dataRef);
  // console.log("영상 URL : " + downloadURL);
  return downloadURL;
}

// Delete 삭제
export async function deleteFile(videoId) {
  const deleteRef = ref(storage, "videos/" + videoId);

  deleteObject(deleteRef)
    .then(() => {
      console.log(videoId, "삭제완료");
    })
    .catch((err) => {
      console.log(err);
    });
}
