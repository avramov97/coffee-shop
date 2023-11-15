package org.westernacher.solutions.domain.models.view;

import org.westernacher.solutions.domain.entities.Coffee;
import org.westernacher.solutions.domain.entities.User;

public class CartViewModel
{
    private String id;
    private Coffee coffee;
    private User user;
    private int quantity;

    public String getId()
    {
        return id;
    }

    public void setId(String id)
    {
        this.id = id;
    }

    public Coffee getCoffee()
    {
        return coffee;
    }

    public void setCoffee(Coffee coffee)
    {
        this.coffee = coffee;
    }

    public User getUser()
    {
        return user;
    }

    public void setUser(User user)
    {
        this.user = user;
    }

    public int getQuantity()
    {
        return quantity;
    }

    public void setQuantity(int quantity)
    {
        this.quantity = quantity;
    }
}
