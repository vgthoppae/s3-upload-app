import './App.css';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'xxx',
    secretAccessKey: 'xxx',
  },
});

function App() {
  const sendDocument = async (document) => {
    const { title, file } = document;

    const uploadParams = {
      Bucket: 'xxx',
      Key: title,
      Body: file,
    };

    try {
      await s3Client.send(new PutObjectCommand(uploadParams));
      alert('Successfully uploaded file.');
    } catch (err) {
      return alert('There was an error uploading your file: ', err.message);
    }
  };

  const uploadFile = (evt) => {
    evt.preventDefault();
    const title = evt.target.title;
    const fileUpload = document.getElementById('fileUpload');
    let formData = new FormData();
    formData.append('file', fileUpload.files[0]);
    // formData.append('file', 'test content');

    if (title.value) {
      console.log('HERE', formData);
      sendDocument({ title: title.value, file: formData });

      title.value = '';
    } else {
      alert('Please fill out all fields');
    }
  };

  return (
    <div className="App">
      <h1>S3 File Upload Demo</h1>

      <div>
        <h4>Upload Document:</h4>
        <form
          onSubmit={uploadFile}
          className="upload"
          method="post"
          encType="multipart/form-data"
        >
          <label>Title: </label>
          <input type="text" name="title" />
          <input id="fileUpload" type="file" name="file" />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
