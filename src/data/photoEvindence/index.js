import { PHOTO1 } from "./photo1";
import { PHOTO2 } from "./photo2";

export const PHOTO_EVIDENCES = {
  photo1: PHOTO1,
};

export function getPhotoEvidence(id) {
  return PHOTO_EVIDENCES[id] || null;
}
