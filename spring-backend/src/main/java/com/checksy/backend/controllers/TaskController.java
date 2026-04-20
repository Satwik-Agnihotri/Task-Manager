package com.checksy.backend.controllers;

import com.checksy.backend.models.Task;
import com.checksy.backend.services.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<?> getTasks(Authentication authentication) {
        try {
            String userId = (String) authentication.getPrincipal();
            List<Task> tasks = taskService.getTasks(userId);
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<?> createTask(Authentication authentication, @RequestBody Task taskRequest) {
        try {
            String userId = (String) authentication.getPrincipal();
            Task task = taskService.createTask(userId, taskRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(task);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(Authentication authentication, @PathVariable String id, @RequestBody Task taskRequest) {
        try {
            String userId = (String) authentication.getPrincipal();
            Task updatedTask = taskService.updateTask(userId, id, taskRequest);
            return ResponseEntity.ok(updatedTask);
        } catch (IllegalArgumentException e) {
            if (e.getMessage().equals("User not authorized")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", e.getMessage()));
            }
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(Authentication authentication, @PathVariable String id) {
        try {
            String userId = (String) authentication.getPrincipal();
            taskService.deleteTask(userId, id);
            return ResponseEntity.ok(Map.of("id", id));
        } catch (IllegalArgumentException e) {
            if (e.getMessage().equals("User not authorized")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", e.getMessage()));
            }
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", e.getMessage()));
        }
    }
}
