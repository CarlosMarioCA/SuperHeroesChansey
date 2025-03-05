package com.DesarrolloWeb.AvengersColombia.objetos.sujetos;

import jakarta.persistence.*;

@Entity
@Table(name = "usuarios")
public class Usuario extends Cuenta {

    protected Usuario() {
        // Constructor requerido por JPA
    }

    public Usuario(String nombre, String email, String password, String imagenPerfil) {
        super(nombre, email, password, imagenPerfil);
    }
}
