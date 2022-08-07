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

export interface INode {
  inputs: INodeParameter[];
  outputs: INodeParameter[];
  name: string;
  category: string[];
}

export interface SDK {
  get_available_nodes(): INode[];
}
