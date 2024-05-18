package com.example.restservice;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface CommentaireRepository extends MongoRepository<Commentaire, String> {
    List<Commentaire> findByImageId(String imageId);

    Optional<Commentaire> findByIdAndImageId(String id, String imageId);
}
