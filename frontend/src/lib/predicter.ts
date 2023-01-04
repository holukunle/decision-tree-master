import { useState } from "react";

export const usePredicter = (model: any) => {
  const makePrediction = (node: any, values: any[], path: any[]): any => {
    // add node id to path
    path.push(node.id);

    if (node.value != null) return node.value;

    const featureVal = values[node.feature_index];
    const nextNode = featureVal <= node.threshold ? node.left : node.right;
    return makePrediction(nextNode, values, path);
  };

  const predict = (values: any) => {
    const path: any[] = [];
    const prediction = makePrediction(model, values, path);
    return { prediction, path };
  };

  return { predict };
};
