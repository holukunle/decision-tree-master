import DragDropFile from "../../components/DragDropFile";
import "./style.css";

interface ILoadModel {
  onSuccess: (data: any) => void;
}

export default function Uploader({ onSuccess }: ILoadModel) {
  const handleUpload = (files: FileList) => {
    if (files.length == 0) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = JSON.parse(event.target?.result as string);
      onSuccess(data);
    };
    reader.readAsText(files[0]);
  };

  return (
    <>
      <div className="info-container">
        <div className="title">Decision Tree</div>
        <div className="sub-title">Fraud Detection</div>
      </div>
      <div className="uploader-container">
        <div className="wrapper">
          <DragDropFile className="uploader" uploadFn={handleUpload} />
        </div>
      </div>
      <div className="copyright">
        2022 © Developed by: Abdelhakim RAFIK - Hamza AIT BEN YISSA - Mouad
        ALLAT
      </div>
    </>
  );
}
