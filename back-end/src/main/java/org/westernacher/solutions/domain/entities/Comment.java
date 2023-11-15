package org.westernacher.solutions.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name="comments")
public class Comment {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false, unique = true, updatable = false)
    private int id;

    @Column(name="text")
    private String text;

    @Column(name="date")
    private Date date;

    @Column(name="likes")
    private int likes;

    @ManyToOne
    @JoinColumn(name="coffee_id")
    private Coffee coffee;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public Coffee getCoffee() {
        return coffee;
    }

    public void setCoffee(Coffee coffee) {
        this.coffee = coffee;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
