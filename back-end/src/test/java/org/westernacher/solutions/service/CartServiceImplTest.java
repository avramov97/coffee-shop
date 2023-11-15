package org.westernacher.solutions.service;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.westernacher.solutions.repository.SavedOrdersRepository;

import static org.junit.jupiter.api.Assertions.*;

class CartServiceImplTest {

    @Test
    void removeSavedOrder() {
        SavedOrdersRepository savedOrdersRepository = Mockito.mock(SavedOrdersRepository.class);
        String id = "";
        savedOrdersRepository.deleteById(id);


    }
}