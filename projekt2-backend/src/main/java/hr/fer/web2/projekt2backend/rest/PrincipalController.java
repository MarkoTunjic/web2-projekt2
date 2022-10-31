package hr.fer.web2.projekt2backend.rest;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.web2.projekt2backend.models.dto.PrincipalDTO;
import hr.fer.web2.projekt2backend.service.PrincipalService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/admin/principals")
public class PrincipalController {
    private final PrincipalService principalService;

    public PrincipalController(PrincipalService principalService) {
        this.principalService = principalService;
    }

    @GetMapping("/insecure")
    ResponseEntity<List<PrincipalDTO>> getAllPrincipalsInsecure() {
        return ResponseEntity.ok(principalService.getAllPrincipals());
    }

    @GetMapping("/secure")
    @SecurityRequirement(name = "BearerAuthentication")
    @PreAuthorize("!hasRole('')")
    ResponseEntity<List<PrincipalDTO>> getAllPrincipalsSecure() {
        return ResponseEntity.ok(principalService.getAllPrincipals());
    }
}
