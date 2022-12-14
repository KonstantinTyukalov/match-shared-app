import { createAction, props } from '@ngrx/store';
import { Chat } from '@dto/chat.dto';
import { ChatMessage } from '@dto/chatMessage.dto';

export const getChatById = createAction('GET_CHAT_BY_ID', props<{ chatId: string; }>());
export const getChatByIdSuccess = createAction('GET_CHAT_BY_ID_SUCCESS', props<{ chat: Chat; }>());

export const getAllChatsByUserId = createAction('GET_CHATS_BY_USER_ID', props<{ id: string; }>());
export const getAllChatsByUserIdSuccess = createAction('GET_CHATS_BY_USER_ID_SUCCESS', props<{ chats: Chat[]; }>());

export const addMessageToCurrentChat = createAction('ADD_MESSAGE_TO_CURRENT_CHAT', props<{ lastChatMessage: ChatMessage; }>());
