package org.westernacher.solutions.domain.models.service;

import org.westernacher.solutions.domain.models.view.CartViewModel;

import java.util.List;

public class CartOrderServiceModel
{
    private String name;
    private String number;
    private String city;
    private String address;
    private String email;
    private boolean delivered;
    private List<CartViewModel> cartViewModelList;

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

    public List<CartViewModel> getCartViewModelList()
    {
        return cartViewModelList;
    }

    public void setCartViewModelList(List<CartViewModel> cartViewModelList)
    {
        this.cartViewModelList = cartViewModelList;
    }
}