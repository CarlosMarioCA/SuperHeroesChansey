package com.DesarrolloWeb.AvengersColombia.repository;

import com.DesarrolloWeb.AvengersColombia.objetos.aviso.PanelAvisos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PanelAvisosRepository extends JpaRepository<PanelAvisos, Long> {
}