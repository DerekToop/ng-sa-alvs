import { AlvsLocation } from './alvs-location.entity';

export interface AlvsCandidate {
  address: string;
  location: AlvsLocation;
  score: number;
  attributes: any;
}

