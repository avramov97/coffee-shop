package org.westernacher.solutions.domain.models.service;

import org.westernacher.solutions.domain.entities.Coffee;

public class OrderServiceModel {
    private int id;
    private String name;
    private String number;
    private String city;
    private String address;
    private String email;
    private int quantity;
    private boolean delivered;
    private Coffee coffee;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getQuantity()
    {
        return quantity;
    }

    public void setQuantity(int quantity)
    {
        this.quantity = quantity;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getNumber()
    {
        return number;
    }

    public void setNumber(String number)
    {
        this.number = number;
    }

    public String getCity()
    {
        return city;
    }

    public void setCity(String city)
    {
        this.city = city;
    }

    public String getAddress()
    {
        return address;
    }

    public void setAddress(String address)
    {
        this.address = address;
    }

    public String getEmail()
    {
        return email;
    }

    public void setEmail(String email)
    {
        this.email = email;
    }

    public boolean isDelivered()
    {
        return delivered;
    }

    public void setDelivered(boolean delivered)
    {
        this.delivered = delivered;
    }

    public Coffee getCoffee()
    {
        return coffee;
    }

    public void setCoffee(Coffee coffee)
    {
        this.coffee = coffee;
    }

}