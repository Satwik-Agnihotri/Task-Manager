package com.checksy.backend.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tasks")
public class Task {

    @Id
    private String id;
    
    private String userId;
    
    private String text;
    
    @Builder.Default
    private boolean completed = false;
    
    @Builder.Default
    private String priority = "Low";
    
    @Builder.Default
    private List<String> tags = new ArrayList<>();
}
