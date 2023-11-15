package org.westernacher.solutions.domain.models.service;

public class CartUpdateCoffeeQuantity
{
    private String id;
    private int quantity;

    public String getId()
    {
        return id;
    }

    public void setId(String id)
    {
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
}
