package hr.fer.web2.projekt2backend.service;

import java.util.List;
import hr.fer.web2.projekt2backend.models.dto.CommentDTO;

public interface CommentService {
    List<CommentDTO> getAllComments();

    void createNewComment(String commentText);
}
