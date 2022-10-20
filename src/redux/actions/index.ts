import { ActionType } from "../action-types";
import { Employee, Message, InnerCompanyChat } from "../../types/index";
import { Conversation } from "../../types/index";
import { Customer } from "../../types/index";

// Login
interface LoginRequest {
  type: ActionType.LOGIN_REQUEST;
}

interface LoginSuccess {
  type: ActionType.LOGIN_SUCCESS;
  payload: Employee;
}

interface LoginFailed {
  type: ActionType.LOGIN_FAIL;
  payload: string;
}

interface SignOut {
  type: ActionType.SIGN_OUT;
}

//All Employees

interface GetAllEmployeesRequest {
  type: ActionType.GET_ALL_EMPLOYEES_REQUEST;
}

interface GetAllEmployeesSuccess {
  type: ActionType.GET_ALL_EMPLOYEES_SUCCESS;
  payload: Employee[];
}

interface GetAllEmployeesFail {
  type: ActionType.GET_ALL_EMPLOYEES_FAIL;
  payload: string;
}

// Edit ONE SPECIFIC EMPLOYEE
interface EditSpecificEmployeeRequest {
  type: ActionType.EDIT_SPECIFIC_EMPLOYEE_REQUEST;
}

interface EditSpecificEmployeeSuccess {
  type: ActionType.EDIT_SPECIFIC_EMPLOYEE_SUCCESS;
  payload: Employee | undefined;
}

interface EditSpecificEmployeeFail {
  type: ActionType.EDIT_SPECIFIC_EMPLOYEE_FAIL;
  payload: string;
}

// REMOVE FROM MENTIONS
interface RemoveFromMentions {
  type: ActionType.REMOVE_FROM_MENTIONS;
  payload: Employee;
}

//All Conversations

interface GetAllConversationsRequest {
  type: ActionType.GET_ALL_CONVERSATIONS_REQUEST;
}

interface GetAllConversationsSuccess {
  type: ActionType.GET_ALL_CONVERSATIONS_SUCCESS;
  payload: Conversation[];
}

interface GetAllConversationsFail {
  type: ActionType.GET_ALL_CONVERSATIONS_FAIL;
  payload: string;
}

// Edit ONE SPECIFIC CONVERSATION
interface EditSpecificConversationRequest {
  type: ActionType.EDIT_SPECIFIC_CONVERSATION_REQUEST;
}

interface EditSpecificConversationSuccess {
  type: ActionType.EDIT_SPECIFIC_CONVERSATION_SUCCESS;
  payload: Conversation | undefined;
}

interface EditSpecificConversationFail {
  type: ActionType.EDIT_SPECIFIC_CONVERSATION_FAIL;
  payload: string;
}

// CREATE NEW CONVERSATION

interface MakeNewConversationRequest {
  type: ActionType.MAKE_NEW_CONVERSATION_REQUEST;
}

interface MakeNewConversationSuccess {
  type: ActionType.MAKE_NEW_CONVERSATION_SUCCESS;
  payload: Conversation;
}

interface MakeNewConversationFail {
  type: ActionType.MAKE_NEW_CONVERSATION_FAIL;
  payload: string;
}

// CREATE NEW COMPANY CHAT

interface MakeNewCompanyChatRequest {
  type: ActionType.MAKE_NEW_COMPANY_CHAT_REQUEST;
}

interface MakeNewCompanyChatSuccess {
  type: ActionType.MAKE_NEW_COMPANY_CHAT_SUCCESS;
  payload: InnerCompanyChat;
}

interface MakeNewCompanyChatFail {
  type: ActionType.MAKE_NEW_COMPANY_CHAT_FAIL;
  payload: string;
}

// ALL EMPLOYEES
interface EditSpecificConversationRequest {
  type: ActionType.EDIT_SPECIFIC_CONVERSATION_REQUEST;
}

interface EditSpecificConversationSuccess {
  type: ActionType.EDIT_SPECIFIC_CONVERSATION_SUCCESS;
  payload: Conversation | undefined;
}

interface EditSpecificConversationFail {
  type: ActionType.EDIT_SPECIFIC_CONVERSATION_FAIL;
  payload: string;
}

// Inner Company Chat

interface GetAllInnerCompanyChatsRequest {
  type: ActionType.GET_ALL_INNER_CONVERSATIONS_REQUEST;
}

interface GetAllInnerCompanyChatsSuccess {
  type: ActionType.GET_ALL_INNER_CONVERSATIONS_SUCCESS;
  payload: InnerCompanyChat[];
}

interface GetAllInnerCompanyChatsFail {
  type: ActionType.GET_ALL_INNER_CONVERSATIONS_FAIL;
  payload: string;
}

// Edit ONE SPECIFIC INNER CONVERSATION
interface EditSpecificInnerConversationRequest {
  type: ActionType.EDIT_SPECIFIC_INNER_CONVERSATION_REQUEST;
}

interface EditSpecificInnerConversationSuccess {
  type: ActionType.EDIT_SPECIFIC_INNER_CONVERSATION_SUCCESS;
  payload: InnerCompanyChat;
}

interface EditSpecificInnerConversationFail {
  type: ActionType.EDIT_SPECIFIC_INNER_CONVERSATION_FAIL;
  payload: string;
}

// REMOVE FROM PARTICIPANTS
interface RemoveFromParticipants {
  type: ActionType.REMOVE_FROM_PARTICIPANTS;
  payload: InnerCompanyChat;
}

export type LoginActions = LoginRequest | LoginSuccess | LoginFailed;

export type SignOutAction = SignOut;

export type EmployeeActions =
  | GetAllEmployeesRequest
  | GetAllEmployeesSuccess
  | GetAllEmployeesFail
  | EditSpecificEmployeeRequest
  | EditSpecificEmployeeSuccess
  | EditSpecificEmployeeFail
  | RemoveFromMentions;

export type ConversationActions =
  | GetAllConversationsRequest
  | GetAllConversationsSuccess
  | GetAllConversationsFail
  | EditSpecificConversationRequest
  | EditSpecificConversationSuccess
  | EditSpecificConversationFail
  | MakeNewConversationRequest
  | MakeNewConversationSuccess
  | MakeNewConversationFail;

export type InnerCompanyChatActions =
  | GetAllInnerCompanyChatsRequest
  | GetAllInnerCompanyChatsSuccess
  | GetAllInnerCompanyChatsFail
  | EditSpecificInnerConversationRequest
  | EditSpecificInnerConversationSuccess
  | EditSpecificInnerConversationFail
  | RemoveFromParticipants
  | MakeNewCompanyChatFail
  | MakeNewCompanyChatSuccess
  | MakeNewCompanyChatRequest;
