package com.assignment.springboot.dto;

import com.assignment.springboot.assignmentEnum.AssignmentEnum;
import com.assignment.springboot.assignmentEnum.AssignmentStatusEnum;
import com.assignment.springboot.domain.Assignment;

public class AssignmentResponse {
    private Assignment assignment;
    private AssignmentEnum[] assignmentEnums = AssignmentEnum.values();
    private AssignmentStatusEnum[] assignmentStatusEnums = AssignmentStatusEnum.values();

    public AssignmentResponse(Assignment assignment) {
        this.assignment = assignment;
    }

    public Assignment getAssignment() {
        return assignment;
    }

    public AssignmentEnum[] getAssignmentEnums() {
        return assignmentEnums;
    }

    public AssignmentStatusEnum[] getAssignmentStatusEnums() {
        return assignmentStatusEnums;
    }
}
