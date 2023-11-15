package org.westernacher.solutions.domain.models.service;

import org.westernacher.solutions.domain.entities.Coffee;
import org.westernacher.solutions.domain.entities.User;

public class SavedOrderServiceModel
{
    private String id;
    private Coffee coffee;
    private User user;

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
}
