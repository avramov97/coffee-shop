package org.westernacher.solutions.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.westernacher.solutions.domain.entities.Comment;

import java.util.List;

public interface CommentsRepository extends JpaRepository<Comment, Integer> {
    int countCommentByCoffee_Id(int id);
    List<Comment> findAllByCoffee_Id(int coffeeId);
}
