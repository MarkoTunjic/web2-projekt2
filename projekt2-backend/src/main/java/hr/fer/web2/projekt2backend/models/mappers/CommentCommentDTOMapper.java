package hr.fer.web2.projekt2backend.models.mappers;

import org.mapstruct.Mapper;

import hr.fer.web2.projekt2backend.models.Comment;
import hr.fer.web2.projekt2backend.models.dto.CommentDTO;

@Mapper(componentModel = "spring")
public interface CommentCommentDTOMapper {
    CommentDTO commentToCommentDTO(Comment comment);
}
