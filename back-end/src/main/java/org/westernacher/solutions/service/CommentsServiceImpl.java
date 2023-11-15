package org.westernacher.solutions.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.westernacher.solutions.domain.entities.Comment;
import org.westernacher.solutions.domain.entities.Likes;
import org.westernacher.solutions.domain.entities.User;
import org.westernacher.solutions.domain.models.binding.AddCommentBindingModel;
import org.westernacher.solutions.domain.models.binding.LikesBindingModel;
import org.westernacher.solutions.domain.models.service.AddCommentServiceModel;
import org.westernacher.solutions.domain.models.service.AllCommentsServiceModel;
import org.westernacher.solutions.repository.CommentsRepository;
import org.westernacher.solutions.repository.LikesRepository;
import org.westernacher.solutions.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentsServiceImpl implements  CommentsService {

    private final CommentsRepository commentsRepository;
    private final LikesRepository likesRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private Optional<User> loggedUser;

    @Autowired
    public CommentsServiceImpl(CommentsRepository commentsRepository, LikesRepository likesRepository, UserRepository userRepository, ModelMapper modelMapper) {
        this.commentsRepository = commentsRepository;
        this.likesRepository = likesRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<AllCommentsServiceModel> getAllCommentsForGuests(int coffeeId) {
        loggedUser = null;

        return this.commentsRepository
                .findAllByCoffee_Id(coffeeId)
                .stream()
                .map(x -> this.modelMapper.map(x, AllCommentsServiceModel.class))
                .collect(Collectors.toUnmodifiableList());
    }

    @Override
    public List<AllCommentsServiceModel> getAllCommentsForUsers(int coffeeId, Authentication authentication) {
        loggedUser = this.userRepository.findByUsername((String) authentication.getPrincipal());

        List<AllCommentsServiceModel> list = this.commentsRepository
                .findAllByCoffee_Id(coffeeId)
                .stream()
                .map(x -> this.modelMapper.map(x, AllCommentsServiceModel.class))
                .collect(Collectors.toList());

        if (loggedUser.isPresent()) {
            for (AllCommentsServiceModel comment : list) {
                if (this.likesRepository.findAllByComment_IdAndUser_Id(comment.getId(), loggedUser.get().getId()).isPresent()) {
                    comment.setLikedByCurrentUser(true);
                }
            }
        }
        return list;
    }

    @Override
    public boolean addComment(AddCommentBindingModel addCommentBindingModel) {
        try {
            Optional<User> user = this.userRepository.findByUsername(addCommentBindingModel.getUsername());
            if (user.isPresent()) {
                AddCommentServiceModel addCommentServiceModel = new AddCommentServiceModel();
                modelMapper.map(addCommentBindingModel, addCommentServiceModel);
                addCommentServiceModel.setUser(user.get());
                this.commentsRepository.save(modelMapper.map(addCommentServiceModel, Comment.class));
                return true;
            } else {
                System.out.println("Comment cannot be added.");
                return false;
            }
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean addLike(int commentId, Authentication authentication) throws Exception {
        Optional<Comment> comment = this.commentsRepository.findById(commentId);
        if (comment.isPresent()) {
            boolean isAdded;
              String userId = this.loggedUser.get().getId();
            Optional<Likes> likes = this.likesRepository.findAllByComment_IdAndUser_Id(commentId, userId);
            if (likes.isPresent()) {
                comment.get().setLikes(comment.get().getLikes() - 1);
                this.likesRepository.delete(likes.get());
                isAdded = false;
            } else {
                comment.get().setLikes(comment.get().getLikes() + 1);
                LikesBindingModel likesBindingModel = new LikesBindingModel(commentId, userId);
                this.likesRepository.save(modelMapper.map(likesBindingModel, Likes.class));
                isAdded = true;
            }

            this.commentsRepository.save(comment.get());
            return isAdded;
        }
        throw new Exception("Comment cannot be found");
    }

    @Override
    public int getCommentsSize(int coffeeId) {
        try {
            return this.commentsRepository.countCommentByCoffee_Id(coffeeId);
        } catch (Exception e) {
            System.out.println("Error when fetching comments size");
            return 0;
        }
    }
}
