export enum ParameterType {
  Array,
  String,
  Number,
  Bool,
  Node,
  None,
}

interface INodeParameter {
  name: string;
  type: ParameterType;
}

export interface INodeInstance {
  inputs: INodeParameter[];
  outputs: INodeParameter[];
  name: string;
}

export interface SDK {
  get_available_nodes(): INodeInstance[];
}
