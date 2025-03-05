package com.DesarrolloWeb.AvengersColombia.objetos.notificacion;
import com.DesarrolloWeb.AvengersColombia.objetos.sujetos.Cuenta; // Relación con la clase "Cuenta"
import jakarta.persistence.*;

@Entity
@Table(name = "notificaciones")
@Inheritance(strategy = InheritanceType.JOINED)
public class Notificacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn(name = "destino_id")
    private Cuenta destino;
    @Column
    private String titulo;
    @Column(length = 1000)
    private String descripcion;

    protected Notificacion() {
        // Constructor requerido por JPA
    }

    public Notificacion(Cuenta destino, String titulo, String descripcion) {
        this.destino = destino;
        this.titulo = titulo;
        this.descripcion = descripcion;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Cuenta getDestino() {
        return destino;
    }

    public void setDestino(Cuenta destino) {
        this.destino = destino;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
