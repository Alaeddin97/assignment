package com.assignment.springboot.web;

import com.assignment.springboot.assignmentEnum.AssignmentEnum;
import com.assignment.springboot.domain.Assignment;
import com.assignment.springboot.domain.User;
import com.assignment.springboot.dto.AssignmentResponse;
import com.assignment.springboot.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.persistence.SecondaryTable;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {
    @Autowired
    private AssignmentService assignmentService;

    @PostMapping("")
    public ResponseEntity<?> createAssignment(@AuthenticationPrincipal User user ){
        Assignment newAssignment=assignmentService.save(user);
        return ResponseEntity.ok(newAssignment);
    }
    @GetMapping("/assignmentsList")
    public ResponseEntity<?> getAssignments(@AuthenticationPrincipal User user){
        Set<Assignment>assignmentSet=assignmentService.assignmentSet(user);
        return ResponseEntity.ok(assignmentSet);
    }
    @GetMapping("{assignmentID}")
    public ResponseEntity<?> getOneAssignment(@PathVariable Long assignmentID, @AuthenticationPrincipal User user){
        Optional<Assignment>assignmentOpt=assignmentService.findById(assignmentID);
        AssignmentResponse response=new AssignmentResponse(assignmentOpt.orElse(new Assignment()));
        return ResponseEntity.ok(response);
    }
    @PostMapping("/updateAssignment/{assignmentID}")
    public ResponseEntity<?> updateAssignment(
                                        @PathVariable Long assignmentID,
                                        @AuthenticationPrincipal User user,
                                        @RequestBody Assignment assignment){
        Assignment newAssignment=assignmentService.updateAssignment(assignmentID,assignment);
        return ResponseEntity.ok(newAssignment);
    }


}
