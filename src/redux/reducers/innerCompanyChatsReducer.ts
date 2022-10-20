import { ActionType } from "../action-types";
import { InnerCompanyChatActions } from "../actions";
import { InnerCompanyChat } from "../../types/index";

interface AllInnerCompanyChatState {
  allInnerCompanyChatData: InnerCompanyChat[] | null | undefined;
  isFetching: boolean;
  error: boolean | string;
}

const initialState = {
  allInnerCompanyChatData: null,
  isFetching: false,
  error: false,
};

// all inner chats
export const allInnerCompanyChatsReducer = (
  state: AllInnerCompanyChatState = initialState,
  action: InnerCompanyChatActions
): AllInnerCompanyChatState => {
  switch (action.type) {
    case ActionType.GET_ALL_INNER_CONVERSATIONS_REQUEST:
      return {
        allInnerCompanyChatData: null,
        isFetching: true,
        error: false,
      };
    case ActionType.GET_ALL_INNER_CONVERSATIONS_SUCCESS:
      return {
        allInnerCompanyChatData: action.payload,
        isFetching: false,
        error: false,
      };
    case ActionType.GET_ALL_INNER_CONVERSATIONS_FAIL:
      return {
        allInnerCompanyChatData: undefined,
        isFetching: false,
        error: action.payload,
      };
    // edit an inner conversation
    case ActionType.EDIT_SPECIFIC_INNER_CONVERSATION_SUCCESS: {
      const editedConvo = action.payload;
      return {
        ...state,
        allInnerCompanyChatData: state.allInnerCompanyChatData?.map((convo) =>
          convo.uuid === editedConvo?.uuid ? editedConvo : convo
        ),
        isFetching: false,
        error: false,
      };
    }
    // make a new chat
    case ActionType.MAKE_NEW_COMPANY_CHAT_SUCCESS: {
      const item = action.payload;
      const v =
        state.allInnerCompanyChatData !== null &&
        state.allInnerCompanyChatData !== undefined
          ? [...state.allInnerCompanyChatData, item]
          : state.allInnerCompanyChatData;
      return {
        ...state,
        allInnerCompanyChatData: v,
        isFetching: false,
        error: false,
      };
    }
    // remove from participnats
    case ActionType.REMOVE_FROM_PARTICIPANTS: {
      const editedConvo = action.payload;
      return {
        ...state,
        allInnerCompanyChatData: state.allInnerCompanyChatData?.map((convo) =>
          convo.uuid === editedConvo?.uuid ? editedConvo : convo
        ),
        isFetching: false,
        error: false,
      };
    }
    default:
      return state;
  }
};
