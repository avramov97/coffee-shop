package org.westernacher.solutions.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.westernacher.solutions.domain.models.binding.AddCommentBindingModel;
import org.westernacher.solutions.domain.models.view.AllCommentsViewModel;
import org.westernacher.solutions.service.CommentsService;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/comments", consumes = "application/json", produces = "application/json")
@CrossOrigin(origins = "*")
public class CommentsController {
    private final CommentsService commentsService;
    private final ModelMapper modelMapper;

    @Autowired
    public CommentsController(CommentsService commentsService, ModelMapper modelMapper) {
        this.commentsService = commentsService;
        this.modelMapper = modelMapper;
    }

    @GetMapping
    public List<AllCommentsViewModel> allCommentsForCoffee(@RequestParam(name = "coffeeId") int coffeeId, Authentication authentication) {
        List<AllCommentsViewModel> allCommentsViewModel;
        if (authentication != null ) {
            allCommentsViewModel = this.commentsService.getAllCommentsForUsers(coffeeId, authentication)
                    .stream()
                    .map(allCommentsServiceModel -> this.modelMapper.map(allCommentsServiceModel, AllCommentsViewModel.class))
                    .collect(Collectors.toList());
        } else {
            allCommentsViewModel = this.commentsService.getAllCommentsForGuests(coffeeId)
                    .stream()
                    .map(allCommentsServiceModel -> this.modelMapper.map(allCommentsServiceModel, AllCommentsViewModel.class))
                    .collect(Collectors.toList());
        }

        return allCommentsViewModel;
    }

    @PostMapping("/add")
    public ResponseEntity addComment(@RequestBody AddCommentBindingModel addCommentBindingModel) throws URISyntaxException {
        boolean commentAdded = false;
        try {
            commentAdded = this.commentsService.addComment(addCommentBindingModel);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.created(new URI("/cart-order")).body(commentAdded);
    }

    @PostMapping("/like")
    public ResponseEntity like(@RequestParam(name = "commentId") int commentId, Authentication authentication) throws URISyntaxException {
        boolean commentAdded = false;
        try {
            commentAdded = this.commentsService.addLike(commentId, authentication);
        } catch (Exception e) {
            e.printStackTrace();
        }
         return ResponseEntity.created(new URI("/cart-order")).body(commentAdded);
    }

    @GetMapping("/size")
    public int getCommentsSize(@RequestParam(name = "coffeeId") int coffeeId) {
        return this.commentsService.getCommentsSize(coffeeId);
    }
}
