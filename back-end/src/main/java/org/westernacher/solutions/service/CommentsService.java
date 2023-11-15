package org.westernacher.solutions.service;

import org.springframework.security.core.Authentication;
import org.westernacher.solutions.domain.models.binding.AddCommentBindingModel;
import org.westernacher.solutions.domain.models.service.AllCommentsServiceModel;

import java.util.List;

public interface CommentsService {
    List<AllCommentsServiceModel> getAllCommentsForGuests(int coffeeId);
    List<AllCommentsServiceModel> getAllCommentsForUsers(int coffeeId, Authentication authentication);
    boolean addComment(AddCommentBindingModel addCommentBindingModel);
    boolean addLike(int commentId, Authentication authentication) throws Exception;
    int getCommentsSize(int coffeeId);
}
