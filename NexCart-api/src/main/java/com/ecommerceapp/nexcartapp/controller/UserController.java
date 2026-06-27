package com.ecommerceapp.nexcartapp.controller;

import com.ecommerceapp.nexcartapp.dto.AccountUpdateRequest;
import com.ecommerceapp.nexcartapp.exception.UserNotFoundException;
import com.ecommerceapp.nexcartapp.model.User;
import com.ecommerceapp.nexcartapp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id) throws UserNotFoundException {
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }

    @PostMapping("/user")
    public  ResponseEntity<User> createUser(@RequestBody User user)  {
        return new ResponseEntity<>(userService.createUser(user), HttpStatus.OK );
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<User> deleteUserById(@PathVariable("id") Long id) throws UserNotFoundException {
        return new ResponseEntity<>( userService.deleteUserById(id), HttpStatus.OK);
    }

    @PutMapping("/user")
    public ResponseEntity<User> updateUser(@RequestBody AccountUpdateRequest accountUpdateRequest) throws UserNotFoundException {
        return new ResponseEntity<>( userService.updateAccout(accountUpdateRequest), HttpStatus.OK);
    }


}
