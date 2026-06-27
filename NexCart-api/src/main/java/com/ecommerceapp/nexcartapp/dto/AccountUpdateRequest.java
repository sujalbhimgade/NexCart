package com.ecommerceapp.nexcartapp.dto;

import com.ecommerceapp.nexcartapp.model.Address;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AccountUpdateRequest {
    Long userId;
    String firstName;
    String lastName;
    String phoneNumber;
    Address address;
    String password;

}
