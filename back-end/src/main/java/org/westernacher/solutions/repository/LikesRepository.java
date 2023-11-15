package org.westernacher.solutions.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.westernacher.solutions.domain.entities.Likes;

import java.util.Optional;

public interface LikesRepository extends JpaRepository<Likes, String> {
    Optional<Likes> findAllByComment_IdAndUser_Id(int commentId, String userId);
    void deleteLikesByComment_IdAndUser_Id(int commentId, String userId);
}

