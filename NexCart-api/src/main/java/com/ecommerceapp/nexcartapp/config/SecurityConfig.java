package com.ecommerceapp.nexcartapp.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    // final because spring will automatially inject it
    private final JwtAuthenticationFilter jwtAuthFilter;

    // this AuthenticationProvider bean we have to implement it in  ApplicationConfig
    private final AuthenticationProvider authenticationProvider;

    private final JwtAuthenticationEntryPoint authenticationEntryPoint;

    // at the start of application spring will look for bean of
    // type SecurityFilterChain and this class is responsible for configuring all http request
    //    for our applciaton

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf ->csrf.disable())  // disable
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint(authenticationEntryPoint)

                )
                .authorizeHttpRequests(
                        auth ->
                                auth.requestMatchers("/api/v1/auth/**").permitAll()
                                        .anyRequest().authenticated()
                )
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)   // tells which authenctication provider i want to use
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);  // i want now to use jwt filter that we have created, i want to call this filter before usernamepasswordauthenctionfilter


        return http.build();
    }



}
