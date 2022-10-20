import { PredefinedMessages } from "../types";

export const predefinedMessages: PredefinedMessages = [
  {
    roles: ["Kundenservice"],
    message: "When did you place the order ?",
  },
  {
    roles: ["Kundenservice"],
    message: "Can you please send me the order number ?",
  },
  {
    roles: ["Kundenservice"],
    message: "Have you recieved the order confirmation ?",
  },
  {
    roles: ["Kundenservice"],
    message: "Please wait 3 days and check again",
  },
  {
    roles: ["Kundenservice"],
    message: "Your order is in process",
  },

  {
    roles: ["Claims"],
    message: "Can you please send me the claim invoice number ?",
  },
  {
    roles: ["Claims"],
    message: "Can you please decscribe the reason your calim fell through ?",
  },
  {
    roles: ["Claims"],
    message: "Your claim is revoked",
  },
  {
    roles: ["Claims"],
    message: "Your claim is approved",
  },
  {
    roles: ["Claims"],
    message: "Your claim is in progress please be paitent",
  },
  {
    roles: ["Claims", "Kundenservice"],
    message: "Can you please send the invoice number ?",
  },
  {
    roles: ["Claims", "Kundenservice"],
    message: "Your request will be processed shortly",
  },
  {
    roles: ["Claims", "Kundenservice"],
    message: "Standard process time is 3 days",
  },
  {
    roles: ["Claims", "Kundenservice"],
    message: "please check your inbox for more details",
  },
];
