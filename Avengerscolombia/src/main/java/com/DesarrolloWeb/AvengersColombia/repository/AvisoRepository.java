package com.DesarrolloWeb.AvengersColombia.repository;

import com.DesarrolloWeb.AvengersColombia.objetos.aviso.Aviso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AvisoRepository extends JpaRepository<Aviso, Integer> {
}