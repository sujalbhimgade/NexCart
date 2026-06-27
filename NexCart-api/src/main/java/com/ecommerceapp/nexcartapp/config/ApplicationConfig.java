package com.ecommerceapp.nexcartapp.config;

import com.ecommerceapp.nexcartapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration

// this class will contains all the applicaion configuration
// so that on start of application spring will pickup and try to implement all bean in this config
public class ApplicationConfig {

    @Autowired
    private  UserRepository userRepository;

    @Bean
    public UserDetailsService userDetailsService(){
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) {
                return userRepository.findByEmail(username)
                        .orElseThrow(() -> new UsernameNotFoundException("No User found with name"+username));
            }
        };
    }


    // this is Data acceess object which is responsible for  fetch user details and also encode user password
    // for this Authentication provder we have many implement one of them is DAO.
    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        // which user details service to use in order to fetch info for our user
        // because we might have multiple implementation of user details
        // one for eg: getting info from database
        // one from another profile/in memory/LDAP/...
        authProvider.setUserDetailsService(userDetailsService());

        // which password encoder we are using
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    // this config holds already info about the authentication manager
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
