package com.DesarrolloWeb.AvengersColombia.objetos.aviso;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "panelAvisos")
public class PanelAvisos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToMany(mappedBy = "panelAvisos", cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonManagedReference
    private List<Aviso> avisos ;

    public PanelAvisos() {
        this.avisos = new ArrayList<>();
    }
    public PanelAvisos(List<Aviso> avisos) {
        this.avisos = avisos;
    }
    public void crearAviso(String titulo, String descripcion, String categoria,String imagenR,Importancia importancia) {
        Aviso aviso = new Aviso(titulo, descripcion, categoria, imagenR, importancia, this);
        aviso.setPanelAvisos(this);
        avisos.add(aviso);
    }

    public void avisoTomado(Aviso aviso) {
        aviso.setDisponible(false);
    }

    public void avisoLiberado(Aviso aviso) {
        aviso.setDisponible(true);
    }

    public void eliminarAviso(Aviso aviso) {
        avisos.remove(aviso);
    }
    public void setAvisos(List<Aviso> avisos) {
        this.avisos = avisos;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public List<Aviso> getAvisosD() {
        return avisos.stream()
                .filter(Aviso::isDisponible)
                .collect(Collectors.toList());
    }

    public List<Aviso> getAvisosND() {
        return avisos.stream()
                .filter(aviso -> !aviso.isDisponible())
                .collect(Collectors.toList());
    }

    public List<Aviso> getAvisos() {
        return avisos;
    }
}
