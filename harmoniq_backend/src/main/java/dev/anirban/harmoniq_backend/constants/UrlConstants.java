package dev.anirban.harmoniq_backend.constants;

public class UrlConstants {

    // Root Endpoints for testing and running
    public static final String PUBLIC_ROUTE = "/public-root";
    public static final String PRIVATE_ROUTE = "/private-root";

    // Authentication Endpoints
    public static final String REGISTER_MODERATOR_ENDPOINT = "/register/moderator";
    public static final String REGISTER_MEMBER_ENDPOINT = "/register/member";
    public static final String LOGIN_ENDPOINT = "/login";
    public static final String LOGIN_AS_GUEST_ENDPOINT = "/login/guest";

    // Thread Endpoints
    public static final String THREAD_CREATE_ENDPOINT = "/thread";
    public static final String THREAD_FETCH_BY_ID_ENDPOINT = "/thread/{id}";
    public static final String THREAD_FETCH_ALL_ENDPOINT = "/thread";
    public static final String THREAD_FETCH_BY_CREATED_BY_USER = "/thread/user";
    public static final String THREAD_DELETE_ENDPOINT = "/thread/{id}";

    // Comment Endpoints
    public static final String COMMENT_CREATE_ENDPOINT = "/comment";
}