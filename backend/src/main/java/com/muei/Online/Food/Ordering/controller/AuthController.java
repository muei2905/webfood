package com.muei.Online.Food.Ordering.controller;

import com.muei.Online.Food.Ordering.config.JwtProvider;
import com.muei.Online.Food.Ordering.model.Cart;
import com.muei.Online.Food.Ordering.model.USER_ROLE;
import com.muei.Online.Food.Ordering.model.User;
import com.muei.Online.Food.Ordering.repository.CartRepository;
import com.muei.Online.Food.Ordering.repository.UserRepository;
import com.muei.Online.Food.Ordering.request.LoginRequest;
import com.muei.Online.Food.Ordering.respone.AuthRespone;
import com.muei.Online.Food.Ordering.service.CustomerUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Collections;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private CustomerUserDetailsService customerUserDetailsService;
    @Autowired
    private CartRepository cartRepository;

    @PostMapping("/signup")
    public ResponseEntity<AuthRespone> createUserHandler(@RequestBody User user) throws Exception {
        User isEmailExist = userRepository.findByEmail(user.getEmail());
        if (isEmailExist!=null){
            throw new Exception("Email is already used with another account");
        }
        User createdUser= new User();
        createdUser.setEmail(user.getEmail());
        createdUser.setFullName(user.getFullName());
        createdUser.setRole(user.getRole());
        createdUser.setPassword(passwordEncoder.encode(user.getPassword()));
        User saveUser = userRepository.save(createdUser);
        Cart cart = new Cart();
        cart.setCustomer(saveUser);
        cartRepository.save(cart);
        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtProvider.generateToken(authentication);
        AuthRespone authRespone= new AuthRespone();
        authRespone.setJwt(jwt);
        authRespone.setMessage("Register success");
        authRespone.setRole(saveUser.getRole());
        return new ResponseEntity<>(authRespone, HttpStatus.CREATED);
    }
    @PostMapping("/signin")
    public ResponseEntity<AuthRespone> signin(@RequestBody LoginRequest req){
        String username = req.getEmail();
        String password = req.getPassword();
        Authentication authentication= authenticate(username, password);
        Collection<? extends GrantedAuthority> authorities= authentication.getAuthorities();
        String role = authorities.isEmpty()?null:authorities.iterator().next().getAuthority();
        String jwt = jwtProvider.generateToken(authentication);
        AuthRespone authRespone= new AuthRespone();
        authRespone.setJwt(jwt);
        authRespone.setMessage("Login success");

        authRespone.setRole(USER_ROLE.valueOf(role));
        return new ResponseEntity<>(authRespone, HttpStatus.OK);
    }

    private Authentication authenticate(String username, String password) {
        UserDetails userDetails= customerUserDetailsService.loadUserByUsername(username);
        if(userDetails==null){
            throw new BadCredentialsException("Invalid username...");
        }
        if(!passwordEncoder.matches(password, userDetails.getPassword())){
            throw new BadCredentialsException("Invalid password...");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null,userDetails.getAuthorities());
    }
}
