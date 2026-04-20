package com.checksy.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AuthResponse {
    @JsonProperty("_id")
    private String id;
    private String username;
    private String email;
    private String token;
    private Boolean isGuest;
    private LocalDateTime guestExpiry;
}
