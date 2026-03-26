export type ChatMessage = {
  type: "message";
  text: string;
};

export type Message = { id: number; text: string; isOwn: boolean };

export function isChatMessage(data: unknown): data is ChatMessage {
  return (
    typeof data === "object" &&
    data !== null &&
    "type" in data &&
    "text" in data &&
    (data as any).type === "message" &&
    typeof (data as any).text === "string"
  );
}
