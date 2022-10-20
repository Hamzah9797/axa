import { ActionType } from "../action-types";
import { ConversationActions } from "../actions";
import { Dispatch } from "redux";
import { conversationsData } from "../../mocks/conversationData";
import { Conversation, Message, Customer } from "../../types";
import { RootState } from "../store";

// get all conversations
export const getAllConversations = () => {
  return async (dispatch: Dispatch<ConversationActions>) => {
    dispatch({
      type: ActionType.GET_ALL_CONVERSATIONS_REQUEST,
    });
    try {
      dispatch({
        type: ActionType.GET_ALL_CONVERSATIONS_SUCCESS,
        payload: conversationsData,
      });
    } catch (err) {
      dispatch({
        type: ActionType.GET_ALL_CONVERSATIONS_FAIL,
        payload: "theres an error getting all the conversations",
      });
    }
  };
};

// edit one specific conversation

export const editSpecificConversation = (
  conversationId: string,
  conversationType: string,
  employeeId: string,
  employeeName: string,
  status: string,
  important: boolean,
  closed?: boolean,
  message?: Message
) => {
  return async (
    dispatch: Dispatch<ConversationActions>,
    getState: () => RootState
  ) => {
    dispatch({
      type: ActionType.EDIT_SPECIFIC_CONVERSATION_REQUEST,
    });
    try {
      const { allConversationsData } = getState();
      const conversation = allConversationsData?.allConversationsData?.find(
        (convo: Conversation) => convo.uuid === conversationId
      );
      dispatch({
        type: ActionType.EDIT_SPECIFIC_CONVERSATION_SUCCESS,
        payload: {
          uuid: conversation?.uuid!,
          conversationType: conversationType,
          employeeParticipantsId: conversation?.employeeParticipantsId!,
          currentOwnerId: employeeId,
          currentOwnerName: employeeName,
          customer: conversation?.customer!,
          status: status!,
          important: important,
          closed: closed!,
          messages:
            message && conversation && conversation.messages
              ? [...conversation.messages, message]
              : conversation?.messages,
        },
      });
    } catch (err) {
      dispatch({
        type: ActionType.EDIT_SPECIFIC_CONVERSATION_FAIL,
        payload: "theres an error getting the specific conversation",
      });
    }
  };
};

// new conversation

export const makeNewConversation = (
  conversationId: string,
  conversationType: string,
  employeeParticipantsId: string[],
  currentOwnerId: string,
  currentOwnerName: string,
  customer: Customer,
  status: string,
  closed: boolean,
  important: boolean,
  messages: Message[]
) => {
  return async (dispatch: Dispatch<ConversationActions>) => {
    dispatch({
      type: ActionType.MAKE_NEW_CONVERSATION_REQUEST,
    });
    try {
      dispatch({
        type: ActionType.MAKE_NEW_CONVERSATION_SUCCESS,
        payload: {
          uuid: conversationId,
          conversationType: conversationType,
          employeeParticipantsId: employeeParticipantsId,
          currentOwnerId: currentOwnerId,
          currentOwnerName: currentOwnerName,
          customer: customer,
          status: status,
          closed: closed,
          important: important,
          messages: messages,
        },
      });
    } catch (err) {
      dispatch({
        type: ActionType.MAKE_NEW_CONVERSATION_FAIL,
        payload: "theres an error getting the specific conversation",
      });
    }
  };
};
