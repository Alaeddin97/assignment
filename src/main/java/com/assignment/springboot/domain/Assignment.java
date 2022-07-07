package com.assignment.springboot.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;

@Entity
public class Assignment {
    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY )
    private Long id;
    private String status;
    private String githubUrl;
    private String branch;
    private int number;
    private String name;
    private String codeReviewVideoUrl;
    @ManyToOne(optional = false)
    private User user;


    //constructors

    public Assignment(int number) {
        this.number = number;
    }

    public Assignment() {
    }
    //getters setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getCodeReviewVideoUrl() {
        return codeReviewVideoUrl;
    }

    public void setCodeReviewVideoUrl(String codeReviewVideoUrl) {
        this.codeReviewVideoUrl = codeReviewVideoUrl;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }
}
