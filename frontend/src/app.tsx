import { useState } from "react";
import Visualizer from "./containers/Visualizer";
import Uploader from "./containers/Uploader";
import "./app.css";

interface IModel {
  model: any;
  features: string[];
}

export default function App() {
  const [model, setModel] = useState<IModel>();

  return (
    <div className="layout">
      {model ? (
        <Visualizer model={model.model} features={model.features} />
      ) : (
        <Uploader onSuccess={setModel} />
      )}
    </div>
  );
}
