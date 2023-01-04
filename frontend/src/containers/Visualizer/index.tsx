import { useEffect, useState, useRef } from "react";
import Tree from "react-d3-tree";
import { RawNodeDatum } from "react-d3-tree/lib/types/types/common";
import Button from "../../components/Button";
import { converte } from "../../lib/converter";
import { usePredicter } from "../../lib/predicter";
import "./style.css";

export interface IVisualizer {
  model: any;
  features: string[];
}

export interface IConfig {
  translate: {
    x: number;
    y: number;
  };
}

export default function Visualizer({ model, features }: IVisualizer) {
  const treeContainer = useRef(null);
  const [data, setData] = useState<RawNodeDatum>();
  const [hide, setHide] = useState<boolean>(false);
  const [config, setConfig] = useState<IConfig>();
  const [path, setPath] = useState<any[]>([]);
  const [decision, setDecision] = useState();
  const { predict } = usePredicter(model);

  const makePrediction = (e: any) => {
    e.preventDefault();
    const values: any[] = [];
    new FormData(e.target).forEach((value) => values.push(Number(value) ?? 0));
    console.log(values);
    const { path: _path, prediction } = predict(values);
    setPath(_path);
    setDecision(prediction);
  };

  const getDynamicPathClass = ({ source, target }: any, orientation: any) => {
    if (
      path.length > 0 &&
      path.includes(source.data.id) &&
      path.includes(target.data.id)
    )
      return "link__to-decision";
    return "";
  };

  const collapseAll = () => {
    console.log(treeContainer.current);
    (treeContainer.current as any)?.tree.traverse((node: any) => {
      node.collapsed = true;
    });
    (treeContainer.current as any)?.setState({});
  };

  const expandAll = () => {
    (treeContainer.current as any)?.tree.traverse((node: any) => {
      node.collapsed = false;
    });
    (treeContainer.current as any)?.setState({});
  };

  useEffect(() => {
    (async () => {
      const transformedData = await converte(model);
      setData(transformedData);
      setConfig({ translate: { x: window.innerWidth / 2 - 20, y: 40 } });
    })();
  }, [model]);

  if (!data) return <b>Loading....</b>;

  return (
    <>
      <div className="form-container">
        <div className="header">
          <img
            className="hide-btn"
            src="images/chevron-up.png"
            onClick={() => setHide((state) => !state)}
          />
          <span>Options</span>
        </div>
        <div className="form-wrapper" style={{ height: hide ? 0 : "100%" }}>
          <form onSubmit={makePrediction}>
            {features.map((feature, index) => (
              <input
                key={`inp-${index}`}
                name={feature}
                placeholder={feature}
                className="feat-input"
              />
            ))}
            <Button text="Predict" className="pre-btn" />
          </form>
          <Button
            text="Collapse all"
            className="pre-btn"
            onClick={collapseAll}
          />
          <Button text="Expand all" className="pre-btn" onClick={expandAll} />
          <div className="decision">
            {decision && (
              <span>
                Decision: <i>{decision}</i>
              </span>
            )}
          </div>
        </div>
      </div>
      <Tree
        ref={treeContainer}
        data={data}
        translate={config?.translate}
        orientation="vertical"
        pathClassFunc={getDynamicPathClass}
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
      />
    </>
  );
}
