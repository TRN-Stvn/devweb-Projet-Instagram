package com.example.restservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/images")
public class CommentaireController {

    @Autowired
    private CommentaireService commentaireService;

    @GetMapping("/{imageId}/commentaires")
    public ResponseEntity<List<Commentaire>> getAllCommentairesByImageId(@PathVariable String imageId) {
        List<Commentaire> commentaires = commentaireService.getCommentsByImageId(imageId);
        return new ResponseEntity<>(commentaires, HttpStatus.OK);
    }

    @GetMapping("/{imageId}/commentaires/{commentaireId}")
    public ResponseEntity<Commentaire> getCommentaireById(@PathVariable String imageId,
            @PathVariable String commentaireId) {
        Optional<Commentaire> commentaire = commentaireService.getCommentByImageIdAndCommentId(imageId, commentaireId);
        return commentaire.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/{imageId}/commentaires")
    public ResponseEntity<Commentaire> addCommentaire(@PathVariable String imageId,
            @RequestBody Commentaire commentaire) {
        commentaire.setImageId(imageId);
        Commentaire savedCommentaire = commentaireService.addComment(commentaire);
        return new ResponseEntity<>(savedCommentaire, HttpStatus.CREATED);
    }

    @DeleteMapping("/{imageId}/commentaires/{commentaireId}")
    public ResponseEntity<Void> deleteCommentaire(@PathVariable String imageId, @PathVariable String commentaireId) {
        Optional<Commentaire> commentaire = commentaireService.getCommentByImageIdAndCommentId(imageId, commentaireId);
        if (commentaire.isPresent()) {
            commentaireService.deleteComment(commentaireId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
