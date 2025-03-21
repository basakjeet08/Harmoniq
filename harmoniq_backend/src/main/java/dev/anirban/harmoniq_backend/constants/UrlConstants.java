package dev.anirban.harmoniq_backend.constants;

public class UrlConstants {

    // Root Endpoints for testing and running
    public static final String PUBLIC_ROUTE = "/api/root/public";
    public static final String PRIVATE_ROUTE = "/api/root/private";

    // Authentication Endpoints
    public static final String REGISTER_ENDPOINT = "/api/auth/register";
    public static final String LOGIN_ENDPOINT = "/api/auth/login";
    public static final String LOGIN_AS_GUEST_ENDPOINT = "/api/auth/login/guests";

    // Thread Endpoints
    public static final String CREATE_THREAD_ENDPOINT = "/api/threads";
    public static final String FETCH_ALL_THREADS_ENDPOINT = "/api/threads";
    public static final String FETCH_THREAD_BY_ID_ENDPOINT = "/api/threads/{id}";
    public static final String FETCH_CURRENT_USER_THREADS_ENDPOINT = "/api/users/me/threads";
    public static final String DELETE_THREAD_BY_ID_ENDPOINT = "/api/threads/{id}";

    // Comment Endpoints
    public static final String CREATE_COMMENT_ENDPOINT = "/api/threads/{threadId}/comments";
}