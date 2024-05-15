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
    repository.save(new Commentaire((long) (Math.random() * 11), "UtilisateurA", "Superbe photo!"));
    repository.save(new Commentaire((long) (Math.random() * 11), "UtilisateurA", "Parfait!"));
    repository.save(new Commentaire((long) (Math.random() * 11), "AmateurPhoto", "J'adore les couleurs."));
    repository.save(new Commentaire((long) 2, "NatureLover", "Magnifique paysage."));
    repository.save(new Commentaire((long) 3, "Voyageur123", "O a été prise cette photo?"));
    repository.save(new Commentaire((long) 2, "Artiste123", "Quel bel angle de vue!"));
    repository.save(new Commentaire((long) (Math.random() * 11), "Curieux22", "Est-ce un montage?"));
    repository.save(new Commentaire((long) (Math.random() * 11), "PassionnéPhoto", "Joli contraste."));
    repository.save(new Commentaire((long) (Math.random() * 11), "LandscapeFan", "Bravo pour cette prise de vue."));
    repository.save(new Commentaire((long) (Math.random() * 11), "ArtEtNature", "Les détails sont incroyables."));
    repository.save(new Commentaire((long) (Math.random() * 11), "PhotographeEnHerbe", "Comment avez-vous réussi cela?"));
    repository.save(new Commentaire((long) (Math.random() * 11), "FanDeCiel", "Ciel époustouflant!"));
    repository.save(new Commentaire((long) (Math.random() * 11), "NuitsEtoilées", "Quelle belle nuit étoilée."));
    repository.save(new Commentaire((long) (Math.random() * 11), "VoyageurDansLeTemps", "Ça me rappelle un voyage lointain."));
    repository.save(new Commentaire((long) (Math.random() * 11), "Exploreur77", "Ciel époustouflant!"));
    repository.save(new Commentaire((long) (Math.random() * 11), "VueSurMer", "J'aimerais être là-bas en ce moment."));
    repository.save(new Commentaire((long) (Math.random() * 11), "OcéanPhotography", "La mer est si apaisante."));
    repository.save(new Commentaire((long) (Math.random() * 11), "AventureExotique", "Des couleurs incroyables!"));
    repository.save(new Commentaire((long) (Math.random() * 11), "Trekker78", "On dirait un tableau."));
    repository.save(new Commentaire((long) (Math.random() * 11), "ExplorateurNature", "Quel endroit unique!"));
    repository.save(new Commentaire((long) (Math.random() * 11), "NatureEnchantée", "Je me sens connecté à la nature."));
    repository.save(new Commentaire((long) (Math.random() * 11), "ExplorateurCosmique", "L'univers est mystérieux."));
    repository.save(new Commentaire((long) (Math.random() * 11), "ChercheurDeVérité", "Il y a tant à découvrir."));
    repository.save(new Commentaire((long) (Math.random() * 11), "AmoureuxDesÉtoiles", "La voie lactée est splendide ce soir."));
    repository.save(new Commentaire((long) (Math.random() * 11), "RêveurDeLune", "La lune n'a jamais été aussi claire."));
    repository.save(new Commentaire((long) (Math.random() * 11), "PassionnéDeGalaxies", "Chaque étoile raconte une histoire."));
    
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