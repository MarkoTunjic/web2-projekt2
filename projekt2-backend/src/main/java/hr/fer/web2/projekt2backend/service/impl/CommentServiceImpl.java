package hr.fer.web2.projekt2backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import hr.fer.web2.projekt2backend.models.Comment;
import hr.fer.web2.projekt2backend.models.dto.CommentDTO;
import hr.fer.web2.projekt2backend.models.mappers.CommentCommentDTOMapper;
import hr.fer.web2.projekt2backend.persistance.CommentRepository;
import hr.fer.web2.projekt2backend.service.CommentService;

@Service
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final CommentCommentDTOMapper commentCommentDTOMapper;

    public CommentServiceImpl(CommentRepository commentRepository, CommentCommentDTOMapper commentCommentDTOMapper) {
        this.commentRepository = commentRepository;
        this.commentCommentDTOMapper = commentCommentDTOMapper;
    }

    @Override
    public List<CommentDTO> getAllComments() {
        return commentRepository.findAll()
                .stream()
                .map(comment -> commentCommentDTOMapper.commentToCommentDTO(comment))
                .toList();
    }

    @Override
    public void createNewComment(String commentText) {
        Comment newComment = new Comment();
        newComment.setCommentText(commentText);
        commentRepository.save(newComment);
    }

}
