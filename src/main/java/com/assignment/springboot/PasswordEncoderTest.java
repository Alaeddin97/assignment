package com.assignment.springboot;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordEncoderTest {


    public void encodePassword(){
    PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
    System.out.println("password: "+passwordEncoder.encode("asdfasdf"));

}
}
