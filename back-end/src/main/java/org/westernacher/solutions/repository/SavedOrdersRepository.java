package org.westernacher.solutions.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.westernacher.solutions.domain.entities.SavedOrder;
import org.westernacher.solutions.domain.entities.User;

public interface SavedOrdersRepository extends JpaRepository<SavedOrder, String> {
    @Query(value = "SELECT SUM(quantity) FROM saved_order WHERE saved_order.user_id=:id", nativeQuery = true)
    int getCartSize(@Param("id") String id);

    int countAllByUser(User user);
}

