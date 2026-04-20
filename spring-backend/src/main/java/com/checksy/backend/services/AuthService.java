package com.checksy.backend.services;

import com.checksy.backend.dto.AuthResponse;
import com.checksy.backend.dto.LoginRequest;
import com.checksy.backend.dto.RegisterRequest;
import com.checksy.backend.models.User;
import com.checksy.backend.repositories.UserRepository;
import com.checksy.backend.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse registerUser(RegisterRequest request) {
        if (request.getUsername() == null || request.getEmail() == null || request.getPassword() == null) {
            throw new IllegalArgumentException("Please provide all required fields");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("User already exists");
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        User savedUser = userRepository.save(user);

        return AuthResponse.builder()
                .id(savedUser.getId())
                .username(savedUser.getUsername())
                .email(savedUser.getEmail())
                .token(jwtUtil.generateToken(savedUser.getId()))
                .build();
    }

    public AuthResponse loginUser(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (user.isGuest() || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        return AuthResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .token(jwtUtil.generateToken(user.getId()))
                .build();
    }

    public AuthResponse guestLogin() {
        String guestId = UUID.randomUUID().toString().substring(0, 6);
        String username = "Guest_" + guestId;
        String email = "guest_" + guestId + "@checksy.local";
        String password = passwordEncoder.encode(guestId);
        LocalDateTime expiry = LocalDateTime.now().plusMinutes(2);

        User user = User.builder()
                .username(username)
                .email(email)
                .password(password)
                .isGuest(true)
                .guestExpiry(expiry)
                .build();

        User savedUser = userRepository.save(user);

        return AuthResponse.builder()
                .id(savedUser.getId())
                .username(savedUser.getUsername())
                .isGuest(true)
                .guestExpiry(savedUser.getGuestExpiry())
                .token(jwtUtil.generateToken(savedUser.getId()))
                .build();
    }
}
