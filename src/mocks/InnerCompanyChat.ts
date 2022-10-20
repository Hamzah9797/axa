import { InnerCompanyChat } from "../types";

export const innerCompanyChat: InnerCompanyChat[] = [
  {
    uuid: "12321323434",
    messages: [
      {
        uuid: "123214456413213",
        senderId: "38712317",
        senderName: "John Doe",
        messageContent:
          "Hi can you please check why the invoice isnt issued yet ?",
        messageMethod: "app",
        messageSentDate: new Date("2022-09-29T10:57:28Z"),
        role: "employee",
        read: false,
      },
      {
        uuid: "12321445612376876",
        senderId: "478236409128321",
        senderName: "Abdul Kareem",
        messageContent: "The bank has blocked the payment",
        messageMethod: "app",
        messageSentDate: new Date("2022-09-29T10:57:28Z"),
        role: "employee",
        read: false,
      },
    ],
    ConversationUuid: "9874893742",
    closed: false,
    EmployeeParticipantsId: ["38712317", "478236409128321"],
    CurrentOwnerId: "38712317",
  },

  {
    uuid: "12321326576867",
    messages: [
      {
        uuid: "123214456418797",
        senderId: "316576423743",
        senderName: "Paola Brokaj",
        messageContent: "Hi has this payment been processed?",
        messageMethod: "app",
        messageSentDate: new Date("2022-09-29T10:57:28Z"),
        role: "employee",
        read: false,
      },
      {
        uuid: "123214456123768769721",
        senderId: "3126712673513",
        senderName: "Sarah Brown",
        messageContent: "This product is not availiable for the user",
        messageMethod: "app",
        messageSentDate: new Date("2022-09-29T10:57:28Z"),
        role: "employee",
        read: false,
      },
    ],
    ConversationUuid: "98748938765",
    closed: false,
    EmployeeParticipantsId: ["3126712673513", "316576423743"],
    CurrentOwnerId: "316576423743",
  },
];
