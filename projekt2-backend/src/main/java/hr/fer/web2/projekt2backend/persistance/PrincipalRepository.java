package hr.fer.web2.projekt2backend.persistance;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import hr.fer.web2.projekt2backend.models.Principal;

@Repository
public interface PrincipalRepository extends JpaRepository<Principal, Long> {
}
