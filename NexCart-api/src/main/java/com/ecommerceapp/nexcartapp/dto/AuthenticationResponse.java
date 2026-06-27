package com.ecommerceapp.nexcartapp.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticationResponse {

    private final String jwt;
    private final UserDto user;

    public AuthenticationResponse(String jwt, UserDto user) {
        this.jwt = jwt;
        this.user = user;
    }

}
