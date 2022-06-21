package com.assignment.springboot.repository;

import com.assignment.springboot.domain.Assignment;
import com.assignment.springboot.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment,Long> {
    Set<Assignment> findByUser(User user);
}
