package org.westernacher.solutions.domain.models.view;

public class OrdersViewModel
{
    private int id;
    private String name;
    private String number;
    private String city;
    private String address;
    private String email;
    private int quantity;
    private String coffeeId;
    private String coffeeName;
    private String coffeeImg1;
    private boolean delivered;

    public String getEmail()
    {
        return email;
    }

    public void setEmail(String email)
    {
        this.email = email;
    }

    public String getCoffeeImg1()
    {
        return coffeeImg1;
    }

    public void setCoffeeImg1(String coffeeImg1)
    {
        this.coffeeImg1 = coffeeImg1;
    }

    public String getCoffeeName()
    {
        return coffeeName;
    }

    public void setCoffeeName(String coffeeName)
    {
        this.coffeeName = coffeeName;
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

    public String getMail() {
        return email;
    }

    public void setMail(String mail) {
        this.email = mail;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public boolean isDelivered() {
        return delivered;
    }

    public void setDelivered(boolean delivered) {
        this.delivered = delivered;
    }

    public String getCoffeeId()
    {
        return coffeeId;
    }

    public void setCoffeeId(String coffeeId)
    {
        this.coffeeId = coffeeId;
    }
}
