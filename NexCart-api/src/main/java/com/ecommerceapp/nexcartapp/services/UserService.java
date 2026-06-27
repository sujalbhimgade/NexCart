package com.ecommerceapp.nexcartapp.services;

import com.ecommerceapp.nexcartapp.dto.AccountUpdateRequest;
import com.ecommerceapp.nexcartapp.exception.UserNotFoundException;
import com.ecommerceapp.nexcartapp.model.User;


public interface UserService {

    public User createUser(User user);
    public User getUserById(Long id) throws UserNotFoundException;
    public User deleteUserById(Long id) throws UserNotFoundException;

    User updateAccout(AccountUpdateRequest accountUpdateRequest) throws UserNotFoundException;
}
