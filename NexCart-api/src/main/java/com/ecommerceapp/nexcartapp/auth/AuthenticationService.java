package com.ecommerceapp.nexcartapp.auth;

import com.ecommerceapp.nexcartapp.config.JWTService;
import com.ecommerceapp.nexcartapp.dto.AuthenticationRequest;
import com.ecommerceapp.nexcartapp.dto.AuthenticationResponse;
import com.ecommerceapp.nexcartapp.dto.RegisterRequest;
import com.ecommerceapp.nexcartapp.dto.UserDto;
import com.ecommerceapp.nexcartapp.exception.UserAlreadyExistException;
import com.ecommerceapp.nexcartapp.exception.UserNotFoundException;
import com.ecommerceapp.nexcartapp.model.Role;
import com.ecommerceapp.nexcartapp.model.User;
import com.ecommerceapp.nexcartapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTService jwtService;

    @Autowired
    AuthenticationManager authenticationManager;


    public AuthenticationResponse register(RegisterRequest request) throws UserAlreadyExistException {
        Optional<User> existingUserByEmail = userRepository.findByEmail(request.getEmail());
        if(existingUserByEmail.isPresent()){
            throw new UserAlreadyExistException("User already exist with email: "+request.getEmail());
        }
        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();



        User savedUser = userRepository.save(user);
        UserDto userDto = UserDto.builder()
                .id(savedUser.getUserId())
                .firstName(savedUser.getFirstName())
                .lastName(savedUser.getLastName())
                .phoneNumber(savedUser.getPhoneNumber())
                .address(savedUser.getAddress())
                .email(savedUser.getEmail())
                .build();
        var jwtToken = jwtService.generateToken(user);
            return AuthenticationResponse.builder()
                    .jwt(jwtToken)
                    .user(userDto)
                    .build();
    }

    // Authentication Manager bean can help here to authenticate the user based on username and password
    public AuthenticationResponse authenticate(AuthenticationRequest request) throws UserNotFoundException {
       // this will authenticate user and password, otherwise throws error
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        // at this point user is authenticated
        var user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new UserNotFoundException("No User found with email "+request.getEmail()));
        UserDto userDto = UserDto.builder()
                .id(user.getUserId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .phoneNumber(user.getPhoneNumber())
                .address(user.getAddress())
                .email(user.getEmail())
                .build();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .jwt(jwtToken)
                .user(userDto)
                .build();

    }
}
