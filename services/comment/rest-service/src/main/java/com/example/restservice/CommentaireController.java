package com.example.restservice;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class CommentaireController {

	private static final String template = "Hello, %s!";
	@GetMapping("/commentaire")
	public Commentaire Commentaire(@RequestParam(value = "name", defaultValue = "World") String name) {
		return new Commentaire(1, "pseudo1", String.format(template, name), null);
	}

	@Autowired
	private CommentaireRepository commentaireRepository;

	@GetMapping("/comments")
	public List<Commentaire> getAllComments() {
		return commentaireRepository.findAll();
	}
	@GetMapping("/comments-by-img-id/{id_image}")
	public List<Commentaire> getCommentsByImgId(@PathVariable long id_image) {
		return commentaireRepository.findById_image(id_image);
	}

	@PostMapping("/upload-com")
	public Commentaire postComment(@RequestBody Commentaire newComment) {
		return commentaireRepository.save(newComment);
	}

	@DeleteMapping("/delete-com/{id}")
	public void deleteComment(@PathVariable long id) {
		commentaireRepository.deleteById(id);
	}
}

