package com.example.restservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentaireService {

    @Autowired
    private CommentaireRepository commentaireRepository;

    public Commentaire addComment(Commentaire commentaire) {
        return commentaireRepository.save(commentaire);
    }

    public List<Commentaire> getAllComments() {
        return commentaireRepository.findAll();
    }

    public List<Commentaire> getCommentsByImageId(String imageId) {
        return commentaireRepository.findByImageId(imageId);
    }

    public Optional<Commentaire> getCommentByImageIdAndCommentId(String imageId, String commentaireId) {
        return commentaireRepository.findByIdAndImageId(commentaireId, imageId);
    }

    public Commentaire updateComment(String id, Commentaire updatedComment) {
        return commentaireRepository.findById(id)
                .map(comment -> {
                    comment.setText(updatedComment.getText());
                    comment.setUserId(updatedComment.getUserId());
                    comment.setDate(updatedComment.getDate());
                    return commentaireRepository.save(comment);
                })
                .orElseGet(() -> {
                    updatedComment.setId(id);
                    return commentaireRepository.save(updatedComment);
                });
    }

    public void deleteComment(String id) {
        commentaireRepository.deleteById(id);
    }
}
