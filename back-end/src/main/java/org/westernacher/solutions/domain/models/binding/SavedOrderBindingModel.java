package org.westernacher.solutions.domain.models.binding;

import org.westernacher.solutions.domain.entities.Coffee;

public class SavedOrderBindingModel
{
    private Coffee coffee;
    private String username;
    private int quantity;

    public String getUsername()
    {
        return username;
    }

    public void setUsername(String username)
    {
        this.username = username;
    }

    public Coffee getCoffee()
    {
        return coffee;
    }

    public void setCoffee(Coffee coffee)
    {
        this.coffee = coffee;
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
