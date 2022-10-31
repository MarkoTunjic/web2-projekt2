package hr.fer.web2.projekt2backend.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.web2.projekt2backend.models.dto.PrincipalDTO;
import hr.fer.web2.projekt2backend.service.PrincipalService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@CrossOrigin
@RestController
public class AuthenticationController {
    private final PrincipalService principalService;

    public AuthenticationController(PrincipalService principalService) {
        this.principalService = principalService;
    }

    @GetMapping
    @SecurityRequirement(name = "BearerAuthentication")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<PrincipalDTO> getCurrentPrincipal() {
        return ResponseEntity.ok(principalService.loginOrRegister());
    }
}
