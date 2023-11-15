package org.westernacher.solutions.domain.models.view;

import org.westernacher.solutions.domain.entities.User;

public class SavedOrdersViewModel
{
    private String id;
    private int coffeeId;
    private String coffeeName;
    private String coffeeNewPrice;
    private String coffeeImg1;
    private int coffeeRAvailability;
    private User user;

    public String getCoffeeImg1()
    {
        return coffeeImg1;
    }

    public void setCoffeeImg1(String coffeeImg1)
    {
        this.coffeeImg1 = coffeeImg1;
    }

    public String getCoffeeNewPrice()
    {
        return coffeeNewPrice;
    }

    public void setCoffeeNewPrice(String coffeeNewPrice)
    {
        this.coffeeNewPrice = coffeeNewPrice;
    }

    public int getCoffeeId()
    {
        return coffeeId;
    }

    public void setCoffeeId(int coffeeId)
    {
        this.coffeeId = coffeeId;
    }

    public String getCoffeeName()
    {
        return coffeeName;
    }

    public void setCoffeeName(String coffeeName)
    {
        this.coffeeName = coffeeName;
    }

    public String getId()
    {
        return id;
    }

    public void setId(String id)
    {
        this.id = id;
    }

    public void setUser(User user)
    {
        this.user = user;
    }

    public User getUser()
    {
        return user;
    }

    public int getCoffeeRAvailability()
    {
        return coffeeRAvailability;
    }

    public void setCoffeeRAvailability(int coffeeRAvailability)
    {
        this.coffeeRAvailability = coffeeRAvailability;
    }
}
