package com.DesarrolloWeb.AvengersColombia.objetos.aviso;

import java.time.LocalDateTime;
import com.DesarrolloWeb.AvengersColombia.objetos.sujetos.Usuario;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "avisos")
public class Aviso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "creador_id")
    private Usuario creador;
    @Column
    private String titulo;
    @Column(length = 5000)
    private String descripcion;
    @Column
    private String categoria;
    @Column
    private String imagenR;
    @Column
    private LocalDateTime fechaCreacion;
    @Enumerated(EnumType.STRING)
    @Column
    private Importancia importancia;
    @Column
    private boolean disponible = true; // Valor predeterminado según la imagen
    @ManyToOne
    @JoinColumn(name = "panel_avisos_id")
    @JsonBackReference
    private PanelAvisos panelAvisos;

    public Aviso(String titulo, String descripcion, String categoria, String imagenR, Importancia importancia, PanelAvisos panelAvisos) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.imagenR = imagenR;
        this.importancia = importancia;
        this.fechaCreacion = LocalDateTime.now();
        this.panelAvisos = panelAvisos;
    }

    public Aviso() {

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

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }


    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public String getImagenR() {
        return imagenR;
    }

    public void setImagenR(String imagenR) {
        this.imagenR = imagenR;
    }

    public boolean isDisponible() {
        return disponible;
    }

    public void setDisponible(boolean disponible) {
        this.disponible = disponible;
    }

    public Importancia getImportancia() {
        return importancia;
    }

    public void setImportancia(Importancia importancia) {
        this.importancia = importancia;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public PanelAvisos getPanelAvisos() {
        return panelAvisos;
    }

    public void setPanelAvisos(PanelAvisos panelAvisos) {
        this.panelAvisos = panelAvisos;
    }

    public Usuario getCreador() {
        return creador;
    }

    public void setCreador(Usuario creador) {
        this.creador = creador;
    }
}
