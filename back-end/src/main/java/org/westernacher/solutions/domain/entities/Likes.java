package org.westernacher.solutions.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "likes")
public class Likes extends BaseEntity {
    private Comment comment;
    private User user;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="user_id", nullable=false)
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="comment_id")
    public Comment getComment() {
        return comment;
    }

    public void setComment(Comment comment) {
        this.comment = comment;
    }
}
