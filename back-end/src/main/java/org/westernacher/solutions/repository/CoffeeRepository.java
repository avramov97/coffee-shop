package org.westernacher.solutions.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.westernacher.solutions.domain.entities.Coffee;
import org.westernacher.solutions.domain.entities.Type;

import java.util.List;
import java.util.Optional;

public interface CoffeeRepository extends JpaRepository<Coffee, Integer> {
    Optional<Coffee> findByName(String s);
    List<Coffee> findAllByType(Type type);
    List<Coffee> findAllByNameContainingIgnoreCase(String brand);
}
