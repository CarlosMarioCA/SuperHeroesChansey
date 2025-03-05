package com.DesarrolloWeb.AvengersColombia.repository;


import com.DesarrolloWeb.AvengersColombia.objetos.sujetos.Cuenta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CuentaRepository extends JpaRepository<Cuenta, Integer> {
    Cuenta findByEmail(String email);
}
