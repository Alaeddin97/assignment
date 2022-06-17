package com.assignment.springboot;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.testng.annotations.Test;

public class PasswordEncoderTest {

@Test
    public void encodePassword(){
    PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
    System.out.println("password: "+passwordEncoder.encode("asdfasdf"));

}
}
