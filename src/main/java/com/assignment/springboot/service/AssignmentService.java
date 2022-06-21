package com.assignment.springboot.service;

import com.assignment.springboot.domain.Assignment;
import com.assignment.springboot.domain.User;
import com.assignment.springboot.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class AssignmentService {
    @Autowired
    private AssignmentRepository assignmentRepository;

    public Assignment save(User user) {
        Assignment assignment=new Assignment();
        assignment.setUser(user);
        assignmentRepository.save(assignment);
        return assignment;
    }

    public Set<Assignment> assignmentSet(User user) {
        return assignmentRepository.findByUser(user);
    }

    public Optional<Assignment> findById(Long assignmentID) {
        return assignmentRepository.findById(assignmentID);
    }
}
