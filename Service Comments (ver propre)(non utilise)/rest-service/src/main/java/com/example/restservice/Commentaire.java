package com.example.restservice;

import java.util.Date;

import org.springframework.data.annotation.Id;

public class Commentaire {
    @Id
    private String id;
    private String imageId;
    private String userId;
    private Date date;
    private String text;

    public Commentaire(String id, String imageId, String userId, Date date, String text) {
        this.id = id;
        this.imageId = imageId;
        this.userId = userId;
        this.date = date;
        this.text = text;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getImageId() {
        return imageId;
    }

    public void setImageId(String imageId) {
        this.imageId = imageId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}