package com.DesarrolloWeb.AvengersColombia.repository;

import com.DesarrolloWeb.AvengersColombia.objetos.sujetos.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Usuario findByEmail(String email);
}