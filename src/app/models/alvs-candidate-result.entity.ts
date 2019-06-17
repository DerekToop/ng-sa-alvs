import { AlvsSpatialReference } from './alvs-spatial-reference.entity';
import { AlvsCandidate } from './alvs-candidate.entity';

export interface AlvsCandidateResult {
  spatialReference: AlvsSpatialReference;
  candidates: AlvsCandidate[];
}
