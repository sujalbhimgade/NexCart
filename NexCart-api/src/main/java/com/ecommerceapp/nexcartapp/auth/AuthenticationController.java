package com.ecommerceapp.nexcartapp.auth;

import com.ecommerceapp.nexcartapp.dto.AuthenticationRequest;
import com.ecommerceapp.nexcartapp.dto.AuthenticationResponse;
import com.ecommerceapp.nexcartapp.dto.RegisterRequest;
import com.ecommerceapp.nexcartapp.exception.UserAlreadyExistException;
import com.ecommerceapp.nexcartapp.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) throws UserAlreadyExistException {
        return  ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) throws UserNotFoundException {
        System.out.println("Request came for login");
        return  ResponseEntity.ok(authenticationService.authenticate(request));
    }


}
