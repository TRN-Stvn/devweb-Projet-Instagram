package com.example.restservice;

// import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@EnableMongoAuditing
@SpringBootApplication
public class AccessingDataMongodbApplication implements CommandLineRunner {

  @Autowired
  private CommentaireRepository repository;

  public static void main(String[] args) {
    SpringApplication.run(AccessingDataMongodbApplication.class, args);
  }

  @Override
  public void run(String... args) throws Exception {

    repository.deleteAll();

    // // save a couple of customers
    // Date now = new Date();
    repository.save(new Commentaire((long) (Math.random() * 11), "UtilisateurA", "Superbe photo!", null));
    repository.save(new Commentaire((long) (Math.random() * 11), "UtilisateurA", "Parfait!", null));
    repository.save(new Commentaire((long) (Math.random() * 11), "AmateurPhoto", "J'adore les couleurs.", null));
    repository.save(new Commentaire((long) 2, "NatureLover", "Magnifique paysage.", null));
    repository.save(new Commentaire((long) 3, "Voyageur123", "O a été prise cette photo?", null));
    repository.save(new Commentaire((long) 2, "Artiste123", "Quel bel angle de vue!", null));
    repository.save(new Commentaire((long) (Math.random() * 11), "Curieux22", "Est-ce un montage?", null));
    repository.save(new Commentaire((long) (Math.random() * 11), "PassionnéPhoto", "Joli contraste.", null));
    repository.save(new Commentaire((long) (Math.random() * 11), "LandscapeFan", "Bravo pour cette prise de vue.", null));
    repository.save(new Commentaire((long) (Math.random() * 11), "ArtEtNature", "Les détails sont incroyables.", null));
    repository.save(new Commentaire((long) (Math.random() * 11), "PhotographeEnHerbe", "Comment avez-vous réussi cela?", null));
    repository.save(new Commentaire((long) (Math.random() * 11), "FanDeCiel", "Ciel époustouflant!", null));
    repository.save(new Commentaire((long) (Math.random() * 11), "NuitsEtoilées", "Quelle belle nuit étoilée.", null));
    repository.save(new Commentaire((long) (Math.random() * 11), "VoyageurDansLeTemps", "Ça me rappelle un voyage lointain.", null));
    repository.save(new Commentaire((long) (Math.random() * 11), "Exploreur77", "Ciel époustouflant!", null));
    repository.save(new Commentaire((long) (Math.random() * 11), "VueSurMer", "J'aimerais être là-bas en ce moment.", null));
    repository.save(new Commentaire((long) (Math.random() * 11), "OcéanPhotography", "La mer est si apaisante.", null));
    repository.save(new Commentaire((long) (Math.random() * 11), "AventureExotique", "Des couleurs incroyables!", null));
    repository.save(new Commentaire((long) (Math.random() * 11), "Trekker78", "On dirait un tableau.", null));
    repository.save(new Commentaire((long) (Math.random() * 11), "ExplorateurNature", "Quel endroit unique!", null));
    repository.save(new Commentaire((long) (Math.random() * 11), "NatureEnchantée", "Je me sens connecté à la nature.", null));
    repository.save(new Commentaire((long) (Math.random() * 11), "ExplorateurCosmique", "L'univers est mystérieux.", null));
    repository.save(new Commentaire((long) (Math.random() * 11), "ChercheurDeVérité", "Il y a tant à découvrir.", null));
    repository.save(new Commentaire((long) (Math.random() * 11), "AmoureuxDesÉtoiles", "La voie lactée est splendide ce soir.", null));
    repository.save(new Commentaire((long) (Math.random() * 11), "RêveurDeLune", "La lune n'a jamais été aussi claire.", null));
    repository.save(new Commentaire((long) (Math.random() * 11), "PassionnéDeGalaxies", "Chaque étoile raconte une histoire.", null));
    
    // fetch all customers
    System.out.println("Commentaire found with findAll():");
    System.out.println("-------------------------------");
    for (Commentaire commentaire : repository.findAll()) {
    System.out.println(commentaire);
    }
    System.out.println();

    // // fetch an individual customer
    // System.out.println("Commentaire found with findByPseudo('UtilisateurA'):");
    // System.out.println("--------------------------------");
    // for (Commentaire commentaire : repository.findByPseudo("UtilisateurA")) {
    // System.out.println(commentaire);
    // }

    // System.out.println("Commentaire found with findByContenu('Ciel
    // époustouflant!'):");
    // System.out.println("--------------------------------");
    // for (Commentaire commentaire : repository.findByContenu("Ciel
    // époustouflant!")) {
    // System.out.println(commentaire);
    // }
  }

}