package com.example.restservice;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface CommentaireRepository extends MongoRepository<Commentaire, String> {

  public List<Commentaire> findByPseudo(String pseudo);

  public List<Commentaire> findByContenu(String contenu);

  @Query("{ 'id_image' : ?0 }") // Assuming 'id_image' is the correct field name in the document
  public List<Commentaire> findById_image(long id_image);

  public void deleteById(long id);

}
