package com.DesarrolloWeb.AvengersColombia.repository;

import com.DesarrolloWeb.AvengersColombia.objetos.sujetos.SuperHeroe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SuperHeroeRepository extends JpaRepository<SuperHeroe, Integer> {
    SuperHeroe findByEmail(String email);
}