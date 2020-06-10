package com.example.main.web;

import com.example.main.entity.User;
import com.example.main.exception.BadPasswordException;
import com.example.main.repository.UserRepository;
import com.example.main.security.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/app/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping(value = "/signin", consumes = "application/json", produces = "application/json")
    public ResponseEntity signIn(@RequestBody AuthRequest request) {
        try {
            String name = request.getUserName();
            User user = userRepository.findUserByUserName(name)
                    .orElseThrow(() -> new UsernameNotFoundException("Not found"));

            if(!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                throw new BadPasswordException("Incorrect password");
            }

            String token = jwtTokenProvider.createToken(
                    name,
                    user.getRoles()
            );
            Map<Object, Object> model = new HashMap<>();
            model.put("userName", name);
            model.put("token", token);
            model.put("role", user.getRoles());

            return ResponseEntity.ok(model);
        } catch (AuthenticationException ex) {
            throw new BadCredentialsException("Invalid username or password");
        }
    }
}
