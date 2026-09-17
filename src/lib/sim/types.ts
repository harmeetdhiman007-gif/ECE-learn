export type Vec = { x: number; y: number };

export type ComponentKind =
  | 'battery'
  | 'resistor'
  | 'led'
  | 'lamp'
  | 'switch'
  | 'wire';

export interface Component {
  id: string;
  kind: ComponentKind;
  a: Vec;
  b: Vec;
  value?: number;
  closed?: boolean;
  broken?: boolean;
  color?: string;
  label?: string;
}

export interface CircuitModel {
  components: Component[];
  ground?: Vec;
}

export interface SimResult {
  nodeVoltages: Map<string, number>;
  componentCurrents: Map<string, number>;
  componentPowers: Map<string, number>;
}
