package org.westernacher.solutions.domain.models.binding;

import org.westernacher.solutions.domain.entities.Type;

public class CoffeeAdd
{
    private String name;
    private String img1;
    private String img2;
    private String img3;
    private String img4;
    private float newPrice;
    private float oldPrice;
    private String quantity;
    private Type type;
    private String sizes;
    private int аvailability;
    private int rAvailability;
    private String description;

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

    public String getImg2()
    {
        return img2;
    }

    public void setImg2(String img2)
    {
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

    public String getQuantity()
    {
        return quantity;
    }

    public void setQuantity(String quantity)
    {
        this.quantity = quantity;
    }

    public Type getType()
    {
        return type;
    }

    public void setType(Type type)
    {
        this.type = type;
    }

    public String getSizes() {
        return sizes;
    }

    public void setSizes(String sizes) {
        this.sizes = sizes;
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

}
