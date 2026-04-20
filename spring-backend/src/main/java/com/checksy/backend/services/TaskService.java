package com.checksy.backend.services;

import com.checksy.backend.models.Task;
import com.checksy.backend.repositories.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getTasks(String userId) {
        return taskRepository.findByUserId(userId);
    }

    public Task createTask(String userId, Task taskRequest) {
        if (taskRequest.getText() == null || taskRequest.getText().isEmpty()) {
            throw new IllegalArgumentException("Please add a text value");
        }
        
        taskRequest.setUserId(userId);
        return taskRepository.save(taskRequest);
    }

    public Task updateTask(String userId, String taskId, Task taskRequest) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));

        if (!task.getUserId().equals(userId)) {
            throw new IllegalArgumentException("User not authorized");
        }

        if (taskRequest.getText() != null) task.setText(taskRequest.getText());
        if (taskRequest.getPriority() != null) task.setPriority(taskRequest.getPriority());
        if (taskRequest.getTags() != null) task.setTags(taskRequest.getTags());
        
        // Ensure completed state is correctly updated
        task.setCompleted(taskRequest.isCompleted());

        return taskRepository.save(task);
    }

    public void deleteTask(String userId, String taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));

        if (!task.getUserId().equals(userId)) {
            throw new IllegalArgumentException("User not authorized");
        }

        taskRepository.delete(task);
    }
}
