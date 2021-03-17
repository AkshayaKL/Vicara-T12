
import axiosInstance from '../axios'

class FileService{
    upload(file, users){
        let formData = new FormData();
        formData.append("file", file);
        formData.append("users", users)
        return axiosInstance.post("api/upload/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
              },
             // onUploadProgress,
        });    
    }
    async getFiles(id) {
        return await axiosInstance.get("api/upload/", id);
      }

      removeFile(id){
         alert(id);
          return axiosInstance.delete(`api/upload/${id}`);
      }
}
export default new FileService();