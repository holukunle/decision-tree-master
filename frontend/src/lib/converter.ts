import { v4 as uuidv4 } from "uuid";

function transform(data: any): any {
  if (!data) return;

  // set unique id for node
  data.id = uuidv4();

  if (data.value != null)
    return {
      id: data.id,
      name: "Decision",
      attributes: {
        decision: data.value,
      },
    };

  return {
    id: data.id,
    name: "Feature",
    attributes: {
      feature: data.feature_index,
      threshold: data.threshold,
      infoGain: data.info_gain.toFixed(7),
    },
    children: [transform(data.left), transform(data.right)],
  };
}

export function converte(data: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const transformedData = transform(data);

    resolve(transformedData);
  });
}
