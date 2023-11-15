package org.westernacher.solutions.domain.entities;

import javax.persistence.*;

@Entity
@Table(name="orders")
public class Order {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false, unique = true, updatable = false)
    private int id;

    @Column(name="name")
    private String name;

    @Column(name="number")
    private String number;

    @Column(name="city")
    private String city;

    @Column(name="address")
    private String address;

    @Column(name="email")
    private String email;

    @Column(name="quantity")
    private int quantity;

    @Column(name="delivered")
    private boolean delivered;

    @ManyToOne
    @JoinColumn(name="coffee_id")
    private Coffee coffee;

    public Coffee getCoffee() {
        return coffee;
    }

    public void setCoffee(Coffee coffee) {
        this.coffee = coffee;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public boolean isDelivered() {
        return delivered;
    }

    public void setDelivered(boolean delivered) {
        this.delivered = delivered;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
