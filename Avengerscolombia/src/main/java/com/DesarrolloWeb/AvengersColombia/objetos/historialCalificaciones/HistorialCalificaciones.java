package com.DesarrolloWeb.AvengersColombia.objetos.historialCalificaciones;

import com.DesarrolloWeb.AvengersColombia.objetos.chat.Mensaje;
import com.DesarrolloWeb.AvengersColombia.objetos.sujetos.SuperHeroe;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "historial_calificaciones")
public class HistorialCalificaciones {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column
    private float calificacionPromedio;
    @OneToMany(mappedBy = "historialCalificaciones", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Calificacion> calificacion;
    @OneToOne
    @JoinColumn(name = "superheroe_id")
    private SuperHeroe superHeroe;

    public HistorialCalificaciones(SuperHeroe superHeroe) {
        this.superHeroe = superHeroe;
        this.calificacion = new ArrayList<>();
    }

    protected HistorialCalificaciones() {

    }

    public void agregarCalificacion(Calificacion calificacion){
        this.calificacion.add(calificacion);
        this.calificacionPromedio = (this.calificacionPromedio + calificacion.getCalificacion())/2;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public float getCalificacionPromedio() {
        return calificacionPromedio;
    }



    public List<Calificacion> getCalificacion() {
        return calificacion;
    }

    public void setCalificacion(ArrayList<Calificacion> calificacion) {
        this.calificacion = calificacion;
    }

    public SuperHeroe getSuperHeroe() {
        return superHeroe;
    }

    public void setSuperHeroe(SuperHeroe superHeroe) {
        this.superHeroe = superHeroe;
    }
}
