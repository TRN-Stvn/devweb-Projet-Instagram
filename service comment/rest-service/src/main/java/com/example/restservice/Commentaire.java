package com.example.restservice;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.Date;

public class Commentaire {
    @Id
    private String id;

    private long id_image;
    private String pseudo;
    private String contenu;

    @CreatedDate
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
    private Date date_published;

    // Getters and setters
    public Commentaire(long id_image, String pseudo, String contenu) {
        this.id_image = id_image;
        this.pseudo = pseudo;
        this.contenu = contenu;
        this.date_published = new Date(); // Set the current date and time
    }

    public String getId() {
        return id;
    }

    public long getId_image() {
        return id_image;
    }

    public String getPseudo() {
        return pseudo;
    }

    public String getContenu() {
        return contenu;
    }

    public Date getDate_published() {
        return date_published;
    }
}
