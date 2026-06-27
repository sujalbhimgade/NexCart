package com.ecommerceapp.nexcartapp.dto;

import com.ecommerceapp.nexcartapp.model.Address;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private Address address;

}
