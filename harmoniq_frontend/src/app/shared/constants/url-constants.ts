import { environment } from 'src/environments/environment';

// Base Url
export const BASE_URL = `${environment.apiBaseUrl}/api`;

// Chatbot Avatar URl
export const CHATBOT_AVATAR_URL = `${environment.apiBaseUrl}/avatars/chatbot/chatbot.jpg`;

// Authentication Endpoints
export const REGISTER_ENDPOINT = `${BASE_URL}/auth/register`;
export const LOGIN_ENDPOINT = `${BASE_URL}/auth/login`;
export const LOGIN_AS_GUEST = `${BASE_URL}/auth/login/guests`;

// User Endpoints
export const USER_AVATAR_FETCH_ALL_ENDPOINT = `${BASE_URL}/users/avatars`;
export const FETCH_USER_BY_ID_ENDPOINT = `${BASE_URL}/users/:id`;
export const UPDATE_USER_ENDPOINT = `${BASE_URL}/users`;
export const DELETE_USER_ENDPOINT = `${BASE_URL}/users`;

// Threads Endpoints
export const CREATE_THREAD_ENDPOINT = `${BASE_URL}/threads`;
export const FETCH_PERSONALISED_THREADS_ENDPOINT = `${BASE_URL}/threads?page=:page&size=:size`;
export const FETCH_ALL_THREADS_BY_TAG = `${BASE_URL}/threads?tag=:tag&page=:page&size=:size`;
export const FETCH_THREAD_BY_ID_ENDPOINT = `${BASE_URL}/threads/:id`;
export const FETCH_CURRENT_USER_THREADS_ENDPOINT = `${BASE_URL}/users/me/threads`;
export const DELETE_THREAD_BY_ID_ENDPOINT = `${BASE_URL}/threads/:id`;

// Like Endpoints
export const TOGGLE_LIKE_ENDPOINTS = `${BASE_URL}/threads/:id/likes`;

// Comment Endpoints
export const CREATE_COMMENT_ENDPOINT = `${BASE_URL}/threads/:threadId/comments`;

// Conversation Endpoints
export const CREATE_CONVERSATION_ENDPOINT = `${BASE_URL}/conversations`;
export const FETCH_USER_CONVERSATIONS = `${BASE_URL}/conversations?page=:page&size=:size`;
export const SEND_MESSAGE = `${BASE_URL}/conversations/:id/messages`;
export const FETCH_CONVERSATION_HISTORY = `${BASE_URL}/conversations/:id/messages?page=:page&size=:size`;
export const DELETE_CONVERSATION_ENDPOINT = `${BASE_URL}/conversations/:id`;
