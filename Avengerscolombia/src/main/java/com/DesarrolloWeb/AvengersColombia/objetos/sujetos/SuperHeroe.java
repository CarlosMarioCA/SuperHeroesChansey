package com.DesarrolloWeb.AvengersColombia.objetos.sujetos;

import com.DesarrolloWeb.AvengersColombia.objetos.historialCalificaciones.HistorialCalificaciones;
import jakarta.persistence.*;

import java.util.ArrayList;
@Entity
@Table(name = "superheroes")
public class SuperHeroe extends Cuenta{
    @Column
    private boolean disponibilidad=false;
    @Column
    private String habilidad;
    @Column(length = 1000)
    private String descripcion;
    @Column
    private float calificacion;
    @OneToOne(mappedBy = "superHeroe", cascade = CascadeType.ALL, orphanRemoval = true)
    private HistorialCalificaciones historialCalificaciones;

    protected SuperHeroe() {
        // Constructor requerido por JPA
    }
    public SuperHeroe(String nombre, String email, String password, String imagenPerfil, String habilidad, String descripcion) {
        super(nombre, email, password, imagenPerfil);
        this.habilidad = habilidad;
        this.descripcion = descripcion;
        this.historialCalificaciones = new HistorialCalificaciones(this);
    }

    public boolean isDisponibilidad() {
        return disponibilidad;
    }

    public void setDisponibilidad(boolean disponibilidad) {
        this.disponibilidad = disponibilidad;
    }

    public String getHabilidad() {
        return habilidad;
    }

    public void setHabilidad(String habilidad) {
        this.habilidad = habilidad;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public float getCalificacion() {
        return calificacion;
    }

    public void setCalificacion(float calificacion) {
        this.calificacion = calificacion;
    }

    public HistorialCalificaciones getHistorialCalificaciones() {
        return historialCalificaciones;
    }

    public void setHistorialCalificaciones(HistorialCalificaciones historialCalificaciones) {
        this.historialCalificaciones = historialCalificaciones;
    }
}
