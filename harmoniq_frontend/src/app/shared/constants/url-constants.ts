// Base Url
export const BASE_URL = 'http://localhost:8080/api';

// Authentication Endpoints
export const REGISTER_ENDPOINT = `${BASE_URL}/auth/register`;
export const LOGIN_ENDPOINT = `${BASE_URL}/auth/login`;
export const LOGIN_AS_GUEST = `${BASE_URL}/auth/login/guests`;

// Threads Endpoints
export const CREATE_THREAD_ENDPOINT = `${BASE_URL}/threads`;
export const FETCH_ALL_THREADS_ENDPOINT = `${BASE_URL}/threads`;
export const FETCH_THREAD_BY_ID_ENDPOINT = `${BASE_URL}/threads/:id`;
export const FETCH_CURRENT_USER_THREADS_ENDPOINT = `${BASE_URL}/users/me/threads`;
export const DELETE_THREAD_BY_ID_ENDPOINT = `${BASE_URL}/threads/:id`;

// Comment Endpoints
export const CREATE_COMMENT_ENDPOINT = `${BASE_URL}/threads/:threadId/comments`;

// Conversation Endpoints
export const CREATE_CONVERSATION_ENDPOINT = `${BASE_URL}/conversations`;
export const FETCH_USER_CONVERSATIONS = `${BASE_URL}/conversations`;
export const SEND_MESSAGE = `${BASE_URL}/conversations/:id/messages`;
export const FETCH_CONVERSATION_HISTORY = `${BASE_URL}/conversations/:id/messages`;
