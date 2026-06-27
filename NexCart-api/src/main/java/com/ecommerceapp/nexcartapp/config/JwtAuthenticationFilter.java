package com.ecommerceapp.nexcartapp.config;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Service
@RequiredArgsConstructor
//RequiredArgsConstructor:  create args constructor using any final field we declared here

// extending this will oncePerRequestFilter because we want to run this class once every request
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JWTService jwtService;

    // here we do have this class from spring security, but we have to make our own
    // since we need to fetch the user from database
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,  // using request we can get the request data
            @NonNull HttpServletResponse response,   // using response we can modify the response
            @NonNull  FilterChain filterChain     // filterchain is to filter the chain
    ) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;
        System.out.println("Called jWTAuthentication Filter");
        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            System.out.println("AuthHeader is null");
            filterChain.doFilter(request, response);
            return; // we dont want to continue with this request so will return it
        }

        // now extract the token from header
        jwt = authHeader.substring(7); // Bearer have 6 letter and one is for space

        try{
            userEmail = jwtService.extractUserEmail(jwt); // todo extract user email from jwt token



        // check if useremail is not null
        // and is user is already authenticated or not yet
        // if authenticated don't need to perform all checks and updating security context
        if(userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null){
           // we can even have User class here that we have created since that is also implementing user details class

            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

            // if token is valid, update the security context and send to request to dispatcher servlet
            if(jwtService.validateToken(jwt, userDetails)){

                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,  // since we don't have credentials in our user, so passing null
                        userDetails.getAuthorities()
                );

                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                // updating the context holder with authTOken
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }

        }
        }
        catch (ExpiredJwtException e){
            System.out.println("Expired Token");

        }

        // don't forget to pass the hand to next filter to be executed
        filterChain.doFilter(request, response);

    }


}
