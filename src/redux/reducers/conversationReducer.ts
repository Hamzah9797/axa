import { ActionType } from "../action-types";
import { ConversationActions } from "../actions";
import { Conversation } from "../../types/index";

interface AllConversationsState {
  allConversationsData: Conversation[] | null | undefined;
  isFetching: boolean;
  error: boolean | string;
}

const initialState = {
  allConversationsData: null,
  isFetching: false,
  error: false,
};

// all conversations
export const allConversationDataReducer = (
  state: AllConversationsState = initialState,
  action: ConversationActions
): AllConversationsState => {
  // all conversation
  switch (action.type) {
    case ActionType.GET_ALL_CONVERSATIONS_REQUEST:
      return {
        allConversationsData: null,
        isFetching: true,
        error: false,
      };
    case ActionType.GET_ALL_CONVERSATIONS_SUCCESS:
      return {
        allConversationsData: action.payload,
        isFetching: false,
        error: false,
      };
    case ActionType.GET_ALL_CONVERSATIONS_FAIL:
      return {
        allConversationsData: null,
        isFetching: false,
        error: action.payload,
      };

    // edit a conversation
    case ActionType.EDIT_SPECIFIC_CONVERSATION_SUCCESS: {
      const editedConvo = action.payload;
      return {
        ...state,
        allConversationsData: state.allConversationsData?.map((convo) =>
          convo.uuid === editedConvo?.uuid ? editedConvo : convo
        ),
        isFetching: false,
        error: false,
      };
    }
    // make a new conversation
    case ActionType.MAKE_NEW_CONVERSATION_SUCCESS: {
      const item = action.payload;
      const v =
        state.allConversationsData !== null &&
        state.allConversationsData !== undefined
          ? [...state.allConversationsData, item]
          : state.allConversationsData;
      return {
        ...state,
        allConversationsData: v,
        isFetching: false,
        error: false,
      };
    }
    // default
    default:
      return state;
  }
};
