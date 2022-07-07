package com.assignment.springboot.service;

import com.assignment.springboot.assignmentEnum.AssignmentStatusEnum;
import com.assignment.springboot.assignmentEnum.AuthorityEnum;
import com.assignment.springboot.domain.Assignment;
import com.assignment.springboot.domain.User;
import com.assignment.springboot.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;


@Service
public class AssignmentService {
    @Autowired
    private AssignmentRepository assignmentRepository;

    public Set<Assignment> findAllSubmitted() {
        Set<Assignment> assignmentsOptional = assignmentRepository.findByStatus(AssignmentStatusEnum.SUBMITTED.getStatus());
        return assignmentsOptional;
    }

    public Assignment save(User user) {
        Assignment assignment = new Assignment();
        assignment.setUser(user);
        assignment.setStatus(AssignmentStatusEnum.PENDING_SUBMISSION.getStatus());
        assignment.setNumber(maxNumber(user));
        assignmentRepository.save(assignment);
        return assignment;
    }

    private int maxNumber(User user) {
        Set<Assignment> byUser = assignmentRepository.findByUser(user);
        if (byUser == null) {
            return 1;
        } else {
            Assignment assignment = byUser.stream()
                    .max(Comparator.comparing(Assignment::getNumber))
                    .orElseThrow(NoSuchElementException::new);
            return assignment.getNumber() + 1;
        }
    }

    private Integer findNextAssignmentToSubmit(User user) {
        Set<Assignment> assignmentsByUser = assignmentRepository.findByUser(user);
        if (assignmentsByUser == null) {
            return 1;
        }
        Optional<Integer> nextAssignmentNumOpt = assignmentsByUser.stream().sorted(
                (a1, a2) -> {
                    if ((Integer) a1.getNumber() == null)
                        return 1;
                    if ((Integer) a2.getNumber() == null)
                        return 1;
                    return ((Integer) a2.getNumber()).compareTo((Integer) (a1.getNumber()));
                }).map(assignment -> {
            if ((Integer) assignment.getNumber() == null)
                return 1;
            return assignment.getNumber() + 1;
        }).findFirst();
        return nextAssignmentNumOpt.orElse(1);
    }

    public Set<Assignment> assignmentSet(User user) {
        boolean isReviewer = user.getAuthorities().stream()
                .filter(auth -> auth.getAuthority().equals(AuthorityEnum.ROLE_REVIEWER.name())).count() > 0;
        if (isReviewer)
            return assignmentRepository.findByCodeReviewer();
        else return assignmentRepository.findByUser(user);
    }

    public Optional<Assignment> findById(Long assignmentID) {
        Optional<Assignment> byId = assignmentRepository.findById(assignmentID);
        return byId;
    }

    public Assignment updateAssignment(Long assignmentID, Assignment assignment) {
        Optional<Assignment> assignmentOpt = findById(assignmentID);
        Assignment newAssignment = assignmentOpt.get();
        newAssignment.setBranch(assignment.getBranch());
        newAssignment.setGithubUrl(assignment.getGithubUrl());
        newAssignment.setStatus(assignment.getStatus());
        newAssignment.setNumber(assignment.getNumber());
        assignmentRepository.save(newAssignment);
        return newAssignment;

    }

}
