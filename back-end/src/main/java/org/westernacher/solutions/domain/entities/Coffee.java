package org.westernacher.solutions.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="coffee")
public class Coffee {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false, unique = true, updatable = false)
    private int id;

    @Column(name="name")
    private String name;

    @Column(name="img1")
    private String img1;

    @Column(name="img2")
    private String img2;

    @Column(name="img3")
    private String img3;

    @Column(name="img4")
    private String img4;

    @Column(name="new_price")
    private float newPrice;

    @Column(name="old_price")
    private float oldPrice;

    @Column(name="discount_percentage")
    private int discountPercentage;

    @Column(name="quantity")
    private String quantity;

    @Column(name="type")
    private Type type;

    @Column(name="likes")
    private int likes;

    @Column(name="rating_sum")
    private int ratingSum;

    @Column(name="times_rated")
    private int timesRated;

    @Column(name="аvailability")
    private int аvailability;

    @Column(name="r_аvailability")
    private int rAvailability;

    @Column(name="description")
    private String description;

    @JsonIgnore
    @OneToMany(mappedBy = "coffee")
    private Set<Order> orders;

    @JsonIgnore
    @OneToMany(mappedBy = "coffee")
    private Set<Comment> comments;

    @PreRemove
    private void removeCoffeeFromOrderAndCart() {
        for (Order order : orders) {
            order.setCoffee(null);
        }

        for (SavedOrder savedOrder : cart) {
            savedOrder.setCoffee(null);
        }
    }

    @JsonIgnore
    @OneToMany(mappedBy = "coffee")
    private List<SavedOrder> cart;

    public List<SavedOrder> getCart() {
        return cart;
    }

    public void setCart(List<SavedOrder> cart) {
        this.cart = cart;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImg1() {
        return img1;
    }

    public void setImg1(String img1) {
        this.img1 = img1;
    }

    public String getImg2() {
        return img2;
    }

    public void setImg2(String img2) {
        this.img2 = img2;
    }

    public String getImg3() {
        return img3;
    }

    public void setImg3(String img3) {
        this.img3 = img3;
    }

    public String getImg4() {
        return img4;
    }

    public void setImg4(String img4) {
        this.img4 = img4;
    }

    public float getNewPrice() {
        return newPrice;
    }

    public void setNewPrice(float newPrice) {
        this.newPrice = newPrice;
    }

    public float getOldPrice() {
        return oldPrice;
    }

    public void setOldPrice(float oldPrice) {
        this.oldPrice = oldPrice;
    }

    public int getDiscountPercentage() {
        return discountPercentage;
    }

    public void setDiscountPercentage(int discountPercentage) {
        this.discountPercentage = discountPercentage;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public int getRatingSum() {
        return ratingSum;
    }

    public void setRatingSum(int ratingSum) {
        this.ratingSum = ratingSum;
    }

    public int getTimesRated() {
        return timesRated;
    }

    public void setTimesRated(int timesRated) {
        this.timesRated = timesRated;
    }

    public int getАvailability() {
        return аvailability;
    }

    public void setАvailability(int аvailability) {
        this.аvailability = аvailability;
    }

    public int getrAvailability() {
        return rAvailability;
    }

    public void setrAvailability(int rAvailability) {
        this.rAvailability = rAvailability;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Order> getOrders() {
        return orders;
    }

    public void setOrders(Set<Order> orders) {
        this.orders = orders;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }
}
