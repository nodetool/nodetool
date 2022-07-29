import { Component, ComponentProps } from "solid-js";
import IconAdd from "~icons/carbon/add";
import IconMicrophone from "~icons/carbon/microphone";
import IconSave from "~icons/carbon/save";
import IconSubtract from "~icons/carbon/subtract";
import IconSpeaker from "~icons/carbon/volume-up";

export const tags = ["math", "outputs", "inputs"] as const;


export interface INodeEntry {
  name: string;
  tags: typeof tags[number][];
  icon: Component<ComponentProps<"svg">>;
}

export const nodes: INodeEntry[] = [
  {
    name: "add",
    tags: ["math"],
    icon: IconAdd,
  },
  {
    name: "subtract",
    tags: ["math"],
    icon: IconSubtract,
  },
  {
    name: "file",
    tags: ["outputs"],
    icon: IconSave,
  },
  {
    name: "audio_input",
    tags: ["inputs"],
    icon: IconMicrophone,
  },
  {
    name: "audio_output",
    tags: ["outputs"],
    icon: IconSpeaker,
  },
];
