export type Employee = {
  uuid: string;
  name: string;
  role: string;
  email: string;
  password: string;
  status: string;
  mentioned: string[];
};

export type Customer = {
  uuid: string;
  familyHeadUuid: string;
  name: string;
  age: number;
  sex: string;
  dob: string;
  martialStatus: string;
  phoneNumber: string;
  email: string;
  address: string;
  products: string[];
};

export type Family = {
  uuid: string;
  headName: string;
  headUUid: string;
  address: string;
  phoneNumber: string;
  email: string;
  members: string[];
};

export type Message = {
  uuid: string;
  senderId: string;
  senderName?: string;
  messageContent: string;
  messageMethod: string;
  messageSentDate: Date;
  role?: string;
};

export type InnerChatMessage = {
  uuid: string;
  senderId: string;
  senderName?: string;
  messageContent: string;
  messageMethod: string;
  messageSentDate: Date;
  role?: string;
  read: boolean;
};

export type Conversation = {
  uuid: string;
  conversationType: string;
  employeeParticipantsId?: string[];
  currentOwnerId?: string;
  currentOwnerName: string;
  customer: Customer;
  status: string;
  important: boolean;
  closed: boolean;
  messages?: Message[];
};

export type Inbox = {
  uuid: string;
  name: string;
  conversation?: Conversation[];
};

export type PredefinedMessage = {
  roles: string[];
  message: string;
};

export type InnerCompanyChat = {
  uuid: string;
  ConversationUuid: string;
  EmployeeParticipantsId?: string[];
  CurrentOwnerId: string;
  closed: boolean;
  messages?: InnerChatMessage[];
};

export type PredefinedMessages = PredefinedMessage[];
