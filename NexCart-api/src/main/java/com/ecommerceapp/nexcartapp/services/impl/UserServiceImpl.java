package com.ecommerceapp.nexcartapp.services.impl;

import com.ecommerceapp.nexcartapp.dto.AccountUpdateRequest;
import com.ecommerceapp.nexcartapp.exception.UserNotFoundException;
import com.ecommerceapp.nexcartapp.model.User;
import com.ecommerceapp.nexcartapp.repository.UserRepository;
import com.ecommerceapp.nexcartapp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User getUserById(Long id) throws UserNotFoundException {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("No User found with id:"+id));
    }

    @Override
    public User deleteUserById(Long id) throws UserNotFoundException {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("No User found with id:"+id));
        userRepository.deleteById(id);
        return user;
    }

    @Override
    public User updateAccout(AccountUpdateRequest accountUpdateRequest) throws UserNotFoundException {
        User user = userRepository.findById(accountUpdateRequest.getUserId()).orElseThrow(() -> new UserNotFoundException("No User found with id: "+accountUpdateRequest.getUserId()));

        user.setAddress(accountUpdateRequest.getAddress());
        user.setFirstName(accountUpdateRequest.getFirstName());
        user.setLastName(accountUpdateRequest.getLastName());
        user.setPhoneNumber(accountUpdateRequest.getPhoneNumber());
        user.setPassword(accountUpdateRequest.getPassword());

        return user;
    }
}
