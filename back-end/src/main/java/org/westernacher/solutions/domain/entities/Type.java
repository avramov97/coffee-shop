package org.westernacher.solutions.domain.entities;

public enum Type {
    CAPSULE("Капсули"),
    PODS("Кесички"),
    GROUND("Мелено"),
    BEANS("Во зрна"),
    INSTANT("Инстант");

    private final String value;

    Type(String value) {
        this.value = value;
    }


    public String getValue() {
        return value;
    }
}
