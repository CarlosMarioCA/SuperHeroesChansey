package com.DesarrolloWeb.AvengersColombia.objetos.sujetos;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "administradores")
public class Administrador {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private String nombre;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(name = "imagen_perfil")
    private String imagenPerfil;
    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    protected Administrador() {
        // Constructor requerido por JPA
    }

    public Administrador( String nombre, String email, String password, String imagenPerfil) {
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.imagenPerfil = imagenPerfil;
        this.fechaCreacion = LocalDateTime.now();
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getImagenPerfil() {
        return imagenPerfil;
    }

    public void setImagenPerfil(String imagenPerfil) {
        this.imagenPerfil = imagenPerfil;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }
}
