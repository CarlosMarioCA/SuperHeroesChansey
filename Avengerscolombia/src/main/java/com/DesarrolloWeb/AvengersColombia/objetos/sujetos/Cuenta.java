package com.DesarrolloWeb.AvengersColombia.objetos.sujetos;

import com.DesarrolloWeb.AvengersColombia.objetos.notificacion.Notificacion;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cuentas")
@Inheritance(strategy = InheritanceType.JOINED)
public class Cuenta {
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
    @OneToMany(mappedBy = "destino", cascade = CascadeType.ALL)
    private List<Notificacion> notificaciones;
    @Column(name = "fecha_creacion")
    private final LocalDateTime fechaCreacion;

    protected Cuenta() {
        this.fechaCreacion = LocalDateTime.now();
    }

    public Cuenta( String nombre, String email, String password, String imagenPerfil) {
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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<Notificacion> getNotificaciones() {
        return notificaciones;
    }

    public void setNotificaciones(List<Notificacion> notificaciones) {
        this.notificaciones = notificaciones;
    }
}
