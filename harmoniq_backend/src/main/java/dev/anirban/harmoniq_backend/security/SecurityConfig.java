package dev.anirban.harmoniq_backend.security;

import dev.anirban.harmoniq_backend.constants.UrlConstants;
import dev.anirban.harmoniq_backend.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserDetailsService userDetailsService;
    private final JwtAuthenticationFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(request ->
                        request
                                // Root Routes
                                .requestMatchers(HttpMethod.GET, UrlConstants.PUBLIC_ROUTE).permitAll()
                                .requestMatchers(HttpMethod.GET, UrlConstants.PRIVATE_ROUTE).authenticated()

                                // Authentication and login Endpoints
                                .requestMatchers(HttpMethod.POST, UrlConstants.REGISTER_ENDPOINT).permitAll()
                                .requestMatchers(HttpMethod.POST, UrlConstants.LOGIN_ENDPOINT).permitAll()
                                .requestMatchers(HttpMethod.POST, UrlConstants.LOGIN_AS_GUEST_ENDPOINT).permitAll()

                                // User Endpoints
                                .requestMatchers(HttpMethod.GET, UrlConstants.USER_AVATAR_FETCH_ALL_ENDPOINT).permitAll()
                                .requestMatchers(HttpMethod.GET, UrlConstants.FETCH_USER_BY_ID_ENDPOINT).permitAll()
                                .requestMatchers(HttpMethod.PATCH, UrlConstants.UPDATE_USER_ENDPOINT).authenticated()
                                .requestMatchers(HttpMethod.DELETE, UrlConstants.DELETE_USER_ENDPOINT).authenticated()

                                // Thread Endpoints
                                .requestMatchers(HttpMethod.POST, UrlConstants.CREATE_THREAD_ENDPOINT).hasAnyAuthority(User.Type.MODERATOR.toString(), User.Type.MEMBER.toString())
                                .requestMatchers(HttpMethod.GET, UrlConstants.FETCH_THREAD_BY_ID_ENDPOINT).authenticated()
                                .requestMatchers(HttpMethod.GET, UrlConstants.FETCH_ALL_THREADS_ENDPOINT).authenticated()
                                .requestMatchers(HttpMethod.GET, UrlConstants.FETCH_CURRENT_USER_THREADS_ENDPOINT).hasAnyAuthority(User.Type.MODERATOR.toString(), User.Type.MEMBER.toString())
                                .requestMatchers(HttpMethod.DELETE, UrlConstants.DELETE_THREAD_BY_ID_ENDPOINT).hasAnyAuthority(User.Type.MODERATOR.toString(), User.Type.MEMBER.toString())

                                // Like Endpoint
                                .requestMatchers(HttpMethod.POST, UrlConstants.TOGGLE_LIKE_ENDPOINT).hasAnyAuthority(User.Type.MODERATOR.toString(), User.Type.MEMBER.toString())

                                // Comment Endpoints
                                .requestMatchers(HttpMethod.POST, UrlConstants.CREATE_COMMENT_ENDPOINT).hasAnyAuthority(User.Type.MODERATOR.toString(), User.Type.MEMBER.toString())

                                // Requests for public static resources are permitted
                                .requestMatchers("/avatars/**").permitAll()

                                // Conversation Endpoints
                                .requestMatchers(HttpMethod.POST, UrlConstants.CREATE_CONVERSATION_ENDPOINT).hasAnyAuthority(User.Type.MODERATOR.toString(), User.Type.MEMBER.toString())
                                .requestMatchers(HttpMethod.GET, UrlConstants.FETCH_CONVERSATION_BY_USER_ENDPOINTS).hasAnyAuthority(User.Type.MODERATOR.toString(), User.Type.MEMBER.toString())
                                .requestMatchers(HttpMethod.GET, UrlConstants.FETCH_CONVERSATION_HISTORY_ENDPOINT).hasAnyAuthority(User.Type.MODERATOR.toString(), User.Type.MEMBER.toString())
                                .requestMatchers(HttpMethod.POST, UrlConstants.PROMPT_CHATBOT_ENDPOINT).permitAll()
                                .requestMatchers(HttpMethod.DELETE, UrlConstants.DELETE_CONVERSATION_ENDPOINT).hasAnyAuthority(User.Type.MODERATOR.toString(), User.Type.MEMBER.toString())

                                // For any other or all requests
                                .anyRequest().authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .authenticationProvider(authenticationProvider())
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("*"));
        configuration.setAllowedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Authorization"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder());
        provider.setUserDetailsService(userDetailsService);
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}