package hr.fer.web2.projekt2backend.service;

import java.util.List;

import hr.fer.web2.projekt2backend.models.Principal;
import hr.fer.web2.projekt2backend.models.dto.PrincipalDTO;

public interface PrincipalService {
    boolean isCurrentUserAdmin();

    Principal getCurrentPrincipal();

    PrincipalDTO loginOrRegister();

    List<PrincipalDTO> getAllPrincipals();
}
