package org.westernacher.solutions.domain.models.binding;

public class LikesBindingModel {
    private String userId;
    private int commentId;

    public LikesBindingModel(int commentId, String userId) {
        this.commentId = commentId;
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getCommentId() {
        return commentId;
    }

    public void setCommentId(int commentId) {
        this.commentId = commentId;
    }
}
