import * as short from 'short-uuid';

const translator = short();

export const shortToUuid = (shortId: string): string => {
  if (!shortId) return shortId;
  return translator.toUUID(shortId);
};

export const uuidToShort = (id: string): string => {
  if (!id) return id;
  return translator.fromUUID(id);
};
