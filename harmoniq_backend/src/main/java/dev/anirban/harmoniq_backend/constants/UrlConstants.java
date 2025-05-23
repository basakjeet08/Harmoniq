package dev.anirban.harmoniq_backend.constants;

public class UrlConstants {

    // Root Endpoints for testing and running
    public static final String PUBLIC_ROUTE = "/api/root/public";
    public static final String PRIVATE_ROUTE = "/api/root/private";

    // Authentication Endpoints
    public static final String REGISTER_ENDPOINT = "/api/auth/register";
    public static final String LOGIN_ENDPOINT = "/api/auth/login";
    public static final String LOGIN_AS_GUEST_ENDPOINT = "/api/auth/login/guests";

    // User Endpoints
    public static final String USER_AVATAR_FETCH_ALL_ENDPOINT = "/api/users/avatars";
    public static final String FETCH_USER_BY_ID_ENDPOINT = "/api/users/{id}";
    public static final String UPDATE_USER_ENDPOINT = "/api/users";
    public static final String DELETE_USER_ENDPOINT = "/api/users";

    // Thread Endpoints
    public static final String CREATE_THREAD_ENDPOINT = "/api/threads";
    public static final String FETCH_THREAD_BY_ID_ENDPOINT = "/api/threads/{id}";
    public static final String FETCH_THREADS_TYPE_TAG_ENDPOINT = "/api/threads/tag/{tagName}";
    public static final String FETCH_THREADS_TYPE_PERSONALISE_ENDPOINT = "/api/threads/personalise";
    public static final String FETCH_THREADS_TYPE_POPULAR_ENDPOINT = "/api/threads/popular";
    public static final String FETCH_CURRENT_USER_THREADS_ENDPOINT = "/api/users/me/threads";
    public static final String DELETE_THREAD_BY_ID_ENDPOINT = "/api/threads/{id}";

    // Tag Endpoints
    public static final String FETCH_ALL_TAGS = "/api/tags";

    // Like Endpoints
    public static final String TOGGLE_LIKE_ENDPOINT = "/api/threads/{threadId}/likes";

    // Comment Endpoints
    public static final String CREATE_COMMENT_ENDPOINT = "/api/threads/{threadId}/comments";
    public static final String FETCH_ALL_COMMENTS_FOR_THREAD_ENDPOINT = "/api/threads/{id}/comments";

    // Conversation Endpoints
    public static final String CREATE_CONVERSATION_ENDPOINT = "/api/conversations";
    public static final String FETCH_CONVERSATION_BY_USER_ENDPOINTS = "/api/conversations";
    public static final String FETCH_CONVERSATION_HISTORY_ENDPOINT = "/api/conversations/{id}/messages";
    public static final String PROMPT_CHATBOT_ENDPOINT = "/api/conversations/{id}/messages";
    public static final String DELETE_CONVERSATION_ENDPOINT = "/api/conversations/{id}";
}