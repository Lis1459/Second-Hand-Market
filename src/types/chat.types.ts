import { isRecord } from "./product.types";

export type ChatMessage = {
  type: "message";
  text: string;
};

export type Message = { id: number; text: string; isOwn: boolean };

export function isChatMessage(data: unknown): data is ChatMessage {
  if (!isRecord(data)) return false;
  const record = data as Record<string, unknown>;
  return record.type === "message" && typeof record.text === "string";
}
