import { Message } from "../types";

export const messages: Message[] = [
  {
    uuid: "12321423",
    senderId: "4628374682734",
    messageContent: "Hi i havent recieved from my purchase yet??!!",
    messageMethod: "email",
    messageSentDate: new Date("2022-09-29T10:47:28Z"),
  },
  {
    uuid: "123214456",
    senderId: "38712317",
    messageContent:
      "Hello mam, can you please share your order number with me ?",
    messageMethod: "portal",
    messageSentDate: new Date("2022-09-29T10:57:28Z"),
    role: "employee",
  },
  {
    uuid: "2783647878678",
    senderId: "4628374682734",
    messageContent: "Hi my payment is not going through",
    messageMethod: "email",
    messageSentDate: new Date("2022-09-30T10:47:28Z"),
  },
  {
    uuid: "1232146784",
    senderId: "316576423743",
    messageContent:
      "Hello can you tell me which product are you trying to purchase?",
    messageMethod: "portal",
    messageSentDate: new Date("2022-09-30T10:57:28Z"),
    role: "employee",
  },
  {
    uuid: "278364787214345",
    senderId: "278364783246",
    messageContent: "Hi my payment is not going through",
    messageMethod: "email",
    messageSentDate: new Date("2022-09-30T10:47:28Z"),
  },
  {
    uuid: "1233456784",
    senderId: "316576423743",
    messageContent:
      "Hello can you tell me which product are you trying to purchase?",
    messageMethod: "portal",
    messageSentDate: new Date("2022-09-30T10:57:28Z"),
    role: "employee",
  },
];
