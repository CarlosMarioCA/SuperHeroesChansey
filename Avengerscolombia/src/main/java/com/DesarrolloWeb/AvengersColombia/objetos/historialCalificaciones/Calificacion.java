package com.DesarrolloWeb.AvengersColombia.objetos.historialCalificaciones;

import com.DesarrolloWeb.AvengersColombia.objetos.sujetos.SuperHeroe;
import com.DesarrolloWeb.AvengersColombia.objetos.sujetos.Usuario;
import jakarta.persistence.*;

import java.time.LocalDateTime;
@Entity
@Table(name = "calificaciones")
public class Calificacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario cuenta;
    @Column(length = 1000)
    private String opinion;
    @Column
    private float calificacion;
    @Column
    private final LocalDateTime fechaCreacion;

    @ManyToOne
    @JoinColumn(name = "historial_id")
    private HistorialCalificaciones historialCalificaciones;

    protected Calificacion() {
        this.fechaCreacion = LocalDateTime.now();
    }

    public Calificacion(Usuario cuenta, String opinion, float calificacion) {
        this.cuenta = cuenta;
        this.opinion = opinion;
        this.calificacion = calificacion;
        this.fechaCreacion =  LocalDateTime.now();;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Usuario getCuenta() {
        return cuenta;
    }

    public void setCuenta(Usuario cuenta) {
        this.cuenta = cuenta;
    }

    public String getOpinion() {
        return opinion;
    }

    public void setOpinion(String opinion) {
        this.opinion = opinion;
    }

    public float getCalificacion() {
        return calificacion;
    }

    public void setCalificacion(float calificacion) {
        this.calificacion = calificacion;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }
}
