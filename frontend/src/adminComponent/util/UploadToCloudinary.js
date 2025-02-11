const upload_preset = "muei-food";
const cloud_name = "dpersgahh";
const cloud_api = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

export const uploadImageToCloud = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", upload_preset);
  data.append("cloud_name", cloud_name);
  const res = await fetch(cloud_api, {
    method: "post",
    body: data,
  });


  const fileData = await res.json();
  return fileData.url;
};
