import { Conversation } from "../types";

export const conversationsData: Conversation[] = [
  {
    uuid: "9874893742",
    conversationType: "Kundenservice",
    employeeParticipantsId: [],
    currentOwnerId: "38712317",
    currentOwnerName: "John Doe",
    customer: {
      uuid: "4628374682734",
      familyHeadUuid: "4628374682734",
      dob: "06.12.1980",
      name: "Mariya Sherimova",
      age: 28,
      sex: "female",
      martialStatus: "single",
      phoneNumber: "1234567",
      email: "mariyasherimova@test.com",
      address: "udom suk, house no 365, bkk, TH",
      products: ["spiatl", "zahn", "Kapital"],
    },
    status: "assigned",
    closed: false,
    important: true,
    messages: [
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
        senderName: "John Doe",
        messageContent:
          "Hello mam, can you please share your order number with me ?",
        messageMethod: "app",
        messageSentDate: new Date("2022-09-29T10:57:28Z"),
        role: "employee",
      },
    ],
  },

  {
    uuid: "98748938765",
    conversationType: "Kundenservice",
    employeeParticipantsId: [],
    currentOwnerId: "316576423743",
    currentOwnerName: "Paola Brokaj",
    customer: {
      uuid: "278364783544",
      name: "Yohannes Adam",
      dob: "06.08.1980",
      familyHeadUuid: "27836478354454",
      age: 23,
      sex: "male",
      martialStatus: "married",
      phoneNumber: "213456234",
      email: "yohannesadam@test.com",
      address: "phrakha, house no 365, bkk, TH",
      products: ["spiatl", "Kapital"],
    },
    status: "assigned",
    important: false,
    closed: false,
    messages: [
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
        senderName: "Paola Brokaj",
        messageContent:
          "Hello can you tell me which product are you trying to purchase?",
        messageMethod: "app",
        messageSentDate: new Date("2022-09-30T10:57:28Z"),
        role: "employee",
      },
    ],
  },

  {
    uuid: "98748939584",
    conversationType: "Kundenservice",
    employeeParticipantsId: [],
    currentOwnerId: "316576423743",
    currentOwnerName: "John Doe",
    customer: {
      uuid: "278364783246",
      name: "Michael Adam",
      dob: "06.12.1982",
      familyHeadUuid: "27836478354454",
      age: 33,
      sex: "male",
      martialStatus: "single",
      phoneNumber: "213456",
      email: "michaeladam@test.com",
      address: "phrakha, house no 365, bkk, TH",
      products: ["spiatl", "zahn", "Kapital"],
    },
    status: "assigned",
    important: false,
    closed: false,
    messages: [
      {
        uuid: "278364787214345",
        senderId: "278364783246",
        messageContent: "Hi my payment is not going through",
        messageMethod: "webForm",
        messageSentDate: new Date("2022-09-30T10:47:28Z"),
      },
      {
        uuid: "1233456784",
        senderId: "316576423743",
        senderName: "Paola Brokaj",
        messageContent:
          "Hello can you tell me which product are you trying to purchase?",
        messageMethod: "portal",
        messageSentDate: new Date("2022-09-30T10:57:28Z"),
        role: "employee",
      },
    ],
  },

  {
    uuid: "98748921334",
    conversationType: "Kundenservice",
    employeeParticipantsId: [],
    currentOwnerId: "",
    currentOwnerName: "",
    customer: {
      uuid: "012364783246",
      familyHeadUuid: "012364783246",
      name: "Yasmin Kedir",
      dob: "06.05.1980",
      age: 39,
      sex: "female",
      martialStatus: "single",
      phoneNumber: "2134561212",
      email: "yasminkedir@test.com",
      address: "asok, house no 369, bkk, TH",
      products: ["spiatl", "zahn", "Kapital"],
    },
    status: "assigned",
    important: false,
    closed: false,
    messages: [
      {
        uuid: "278364787214345355",
        senderId: "012364783246",
        messageContent: "What is happenig with premiums ?",
        messageMethod: "webForm",
        messageSentDate: new Date("2022-09-30T10:47:28Z"),
      },
    ],
  },

  {
    uuid: "987489201282",
    conversationType: "Kundenservice",
    employeeParticipantsId: [],
    currentOwnerId: "",
    currentOwnerName: "",
    customer: {
      uuid: "278347846237",
      familyHeadUuid: "4628374682734",
      name: "Asya Sherimova",
      age: 31,
      sex: "female",
      dob: "06.10.1980",
      martialStatus: "married",
      phoneNumber: "1234576",
      email: "asyasherimova@test.com",
      address: "on nut, house no 365, bkk, TH",
      products: ["spiatl", "zahn"],
    },
    status: "unassigned",
    important: false,
    closed: false,
    messages: [
      {
        uuid: "22349865465",
        senderId: "278347846237",
        messageContent: "My hospital charges have not arrived ?",
        messageMethod: "app",
        messageSentDate: new Date("2022-09-30T10:47:28Z"),
      },
    ],
  },

  {
    uuid: "987489221345",
    conversationType: "Claims",
    employeeParticipantsId: [],
    currentOwnerId: "",
    currentOwnerName: "",
    customer: {
      uuid: "4628374682734",
      name: "Mariya Sherimova",
      familyHeadUuid: "4628374682734",
      dob: "06.12.1980",
      age: 28,
      sex: "female",
      martialStatus: "single",
      phoneNumber: "1234567",
      email: "mariyasherimova@test.com",
      address: "udom suk, house no 365, bkk, TH",
      products: ["spiatl", "zahn", "Kapital"],
    },
    status: "unassigned",
    important: false,
    closed: false,
    messages: [
      {
        uuid: "2234986789565",
        senderId: "4628374682734",
        messageContent: "Cant Login to my account",
        messageMethod: "app",
        messageSentDate: new Date("2022-09-30T10:47:28Z"),
      },
    ],
  },

  {
    uuid: "987657821345",
    conversationType: "Claims",
    employeeParticipantsId: [],
    currentOwnerId: "",
    currentOwnerName: "",
    customer: {
      uuid: "278364783246",
      familyHeadUuid: "27836478354454",
      dob: "06.12.1982",
      name: "Michael Adam",
      age: 33,
      sex: "male",
      martialStatus: "single",
      phoneNumber: "213456",
      email: "michaeladam@test.com",
      address: "phrakha, house no 365, bkk, TH",
      products: ["spiatl", "zahn", "Kapital"],
    },
    status: "assigned",
    important: false,
    closed: false,
    messages: [
      {
        uuid: "2234012439565",
        senderId: "278364783246",
        messageContent: "Cant Access my reciepts",
        messageMethod: "email",
        messageSentDate: new Date("2022-09-30T10:47:28Z"),
      },
    ],
  },

  {
    uuid: "98748003284",
    conversationType: "Claims",
    employeeParticipantsId: [],
    currentOwnerId: "78236409128321",
    currentOwnerName: "Abdul Kareem",
    customer: {
      uuid: "278364783246",
      familyHeadUuid: "27836478354454",
      name: "Michael Adam",
      dob: "06.12.1982",
      age: 33,
      sex: "male",
      martialStatus: "single",
      phoneNumber: "213456",
      email: "michaeladam@test.com",
      address: "phrakha, house no 365, bkk, TH",
      products: ["spiatl", "zahn", "Kapital"],
    },
    status: "assigned",
    important: false,
    closed: false,
    messages: [
      {
        uuid: "278364787221312",
        senderId: "278364783246",
        messageContent: "Hi my payment went through",
        messageMethod: "app",
        messageSentDate: new Date("2022-09-30T10:47:28Z"),
      },
      {
        uuid: "1233456784213",
        senderId: "78236409128321",
        senderName: "Abdul Kareem",
        messageContent:
          "Hello can you tell me which service are you trying to purchase?",
        messageMethod: "portal",
        messageSentDate: new Date("2022-09-30T10:57:28Z"),
        role: "employee",
      },
    ],
  },
];
