package hr.fer.web2.projekt2backend.rest;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.web2.projekt2backend.models.dto.CommentDTO;
import hr.fer.web2.projekt2backend.service.CommentService;

@RestController
@RequestMapping("/comments")
public class CommentControler {
    private final CommentService commentService;

    public CommentControler(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping
    public ResponseEntity<Void> createNewComment(@RequestBody String commentText) {
        commentService.createNewComment(commentText);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity<List<CommentDTO>> getAllComments() {
        return ResponseEntity.ok(commentService.getAllComments());
    }
}
