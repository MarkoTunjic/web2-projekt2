package hr.fer.web2.projekt2backend.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import hr.fer.web2.projekt2backend.helper.PrincipalType;
import hr.fer.web2.projekt2backend.models.Principal;
import hr.fer.web2.projekt2backend.models.dto.PrincipalDTO;
import hr.fer.web2.projekt2backend.models.mappers.PrincipalPrincipalDTOMapper;
import hr.fer.web2.projekt2backend.persistance.PrincipalRepository;
import hr.fer.web2.projekt2backend.service.PrincipalService;

@Service
public class PrincipalServiceImpl implements PrincipalService {
    private final PrincipalRepository principalRepository;
    private final PrincipalPrincipalDTOMapper mapper;

    public PrincipalServiceImpl(PrincipalRepository principalRepository, PrincipalPrincipalDTOMapper mapper) {
        this.principalRepository = principalRepository;
        this.mapper = mapper;
    }

    @Override
    public boolean isCurrentUserAdmin() {
        Optional<Principal> optionalPrincipal = current();
        if (optionalPrincipal.isEmpty())
            throw new IllegalArgumentException("Unregistered user");
        return optionalPrincipal.get().getPrincipalType().equals(PrincipalType.ADMIN);
    }

    @Override
    public Principal getCurrentPrincipal() {
        Optional<Principal> optionalPrincipal = current();
        if (optionalPrincipal.isEmpty())
            throw new IllegalArgumentException("Unregistered user");
        return optionalPrincipal.get();
    }

    @Override
    public PrincipalDTO loginOrRegister() {
        Optional<Principal> current = current();
        if (current.isPresent())
            return mapper.principalToPrincipalDTO(current.get());
        Principal newPrincipal = new Principal();
        newPrincipal.setPrincipalType(PrincipalType.USER);
        newPrincipal.setEmail(getEmail());
        return mapper.principalToPrincipalDTO(principalRepository.save(newPrincipal));
    }

    private Optional<Principal> current() {
        return principalRepository.findByEmail(getEmail());
    }

    private String getEmail() {
        Jwt userDetails = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userDetails.getClaim("https://example.com/email");
    }

    @Override
    public List<PrincipalDTO> getAllPrincipals() {
        return principalRepository
                .findAll()
                .stream()
                .map(principal -> mapper.principalToPrincipalDTO(principal))
                .toList();
    }
}
