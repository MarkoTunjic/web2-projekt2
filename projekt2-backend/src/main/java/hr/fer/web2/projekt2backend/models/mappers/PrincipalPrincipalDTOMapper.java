package hr.fer.web2.projekt2backend.models.mappers;

import org.mapstruct.Mapper;

import hr.fer.web2.projekt2backend.models.Principal;
import hr.fer.web2.projekt2backend.models.dto.PrincipalDTO;

@Mapper(componentModel = "spring")
public interface PrincipalPrincipalDTOMapper {
    PrincipalDTO principalToPrincipalDTO(Principal principal);
}
