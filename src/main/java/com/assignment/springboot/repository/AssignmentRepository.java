package com.assignment.springboot.repository;

import com.assignment.springboot.domain.Assignment;
import com.assignment.springboot.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment,Long> {
    Set<Assignment> findByUser(User user);
    Optional<Assignment> findById(Long id);
    Set<Assignment> findByStatus(String status);
    @Query("select a from Assignment a where a.status='Submitted'")
    Set<Assignment> findByCodeReviewer();
}
