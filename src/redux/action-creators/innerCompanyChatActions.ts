import { ActionType } from "../action-types";
import { InnerCompanyChatActions } from "../actions";
import { Dispatch } from "redux";
import { innerCompanyChat } from "../../mocks/InnerCompanyChat";
import { InnerCompanyChat, InnerChatMessage } from "../../types";
import { RootState } from "../store";

// get all inner conversations

export const getAllInnerCompanyChats = () => {
  return async (dispatch: Dispatch<InnerCompanyChatActions>) => {
    dispatch({
      type: ActionType.GET_ALL_INNER_CONVERSATIONS_REQUEST,
    });
    try {
      dispatch({
        type: ActionType.GET_ALL_INNER_CONVERSATIONS_SUCCESS,
        payload: innerCompanyChat,
      });
    } catch (err) {
      dispatch({
        type: ActionType.GET_ALL_INNER_CONVERSATIONS_FAIL,
        payload: "theres an error getting all the inner company chats",
      });
    }
  };
};

// edit one specific inner company chat
export const editSpecificInnerCompanyChat = (
  chatId?: string,
  conversationId?: string,
  employeeParticipant?: string,
  currentOwnerId?: string,
  message?: InnerChatMessage | "",
  closed?: boolean
) => {
  return async (
    dispatch: Dispatch<InnerCompanyChatActions>,
    getState: () => RootState
  ) => {
    dispatch({
      type: ActionType.EDIT_SPECIFIC_INNER_CONVERSATION_REQUEST,
    });
    try {
      const { allInnerChats } = getState();

      const conversation = allInnerChats.allInnerCompanyChatData?.find(
        (convo: InnerCompanyChat) => convo.ConversationUuid === conversationId
      );
      dispatch({
        type: ActionType.EDIT_SPECIFIC_INNER_CONVERSATION_SUCCESS,
        payload: {
          uuid: chatId!,
          ConversationUuid: conversationId!,
          CurrentOwnerId: currentOwnerId!,
          closed: closed!,
          EmployeeParticipantsId:
            employeeParticipant &&
            conversation &&
            conversation.EmployeeParticipantsId
              ? [...conversation.EmployeeParticipantsId, employeeParticipant]
              : conversation?.EmployeeParticipantsId,
          messages:
            message && conversation && conversation.messages
              ? [...conversation.messages, message]
              : conversation?.messages,
        },
      });
    } catch (err) {
      dispatch({
        type: ActionType.EDIT_SPECIFIC_INNER_CONVERSATION_FAIL,
        payload: "theres an error getting the specific conversation",
      });
    }
  };
};

// new company chat

export const makeNewCompanyChat = (
  uuid: string,
  messages: InnerChatMessage[],
  ConversationUuid: string,
  closed: boolean,
  EmployeeParticipantsId: string[],
  CurrentOwnerId: string
) => {
  return async (dispatch: Dispatch<InnerCompanyChatActions>) => {
    dispatch({
      type: ActionType.MAKE_NEW_COMPANY_CHAT_REQUEST,
    });
    try {
      dispatch({
        type: ActionType.MAKE_NEW_COMPANY_CHAT_SUCCESS,
        payload: {
          uuid: uuid,
          messages: messages,
          ConversationUuid: ConversationUuid,
          closed: closed,
          EmployeeParticipantsId: EmployeeParticipantsId,
          CurrentOwnerId: CurrentOwnerId,
        },
      });
    } catch (err) {
      dispatch({
        type: ActionType.MAKE_NEW_COMPANY_CHAT_FAIL,
        payload: "theres an error",
      });
    }
  };
};

// remove from participants
export const removeFromParticipants = (
  conversationId: string,
  employeeParticipantId?: string
) => {
  return async (
    dispatch: Dispatch<InnerCompanyChatActions>,
    getState: () => RootState
  ) => {
    const { allInnerChats } = getState();

    const conversation = allInnerChats.allInnerCompanyChatData?.find(
      (convo: InnerCompanyChat) => convo.ConversationUuid === conversationId
    );

    dispatch({
      type: ActionType.REMOVE_FROM_PARTICIPANTS,
      payload: {
        uuid: conversation?.uuid!,
        ConversationUuid: conversationId!,
        CurrentOwnerId: conversation?.CurrentOwnerId!,
        closed: conversation?.closed!,
        EmployeeParticipantsId: conversation?.EmployeeParticipantsId?.filter(
          (id) => id !== employeeParticipantId
        ),
        messages: conversation?.messages,
      },
    });
  };
};
