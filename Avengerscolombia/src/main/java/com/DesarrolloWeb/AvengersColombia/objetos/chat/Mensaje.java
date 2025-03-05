package com.DesarrolloWeb.AvengersColombia.objetos.chat;

import com.DesarrolloWeb.AvengersColombia.objetos.sujetos.Cuenta;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDateTime;
@Entity
@Table(name = "mensajes")
public class Mensaje {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "autor_id")
    @JsonIgnoreProperties({"password", "notificaciones"}) // Ignorar datos sensibles del autor
    private Cuenta Autor;

    @Column(length = 5000)
    private String texto;

    @Column
    private final LocalDateTime fechaCreacion;

    @ManyToOne
    @JoinColumn(name = "chat_id")
    @JsonBackReference
    private Chat chat;

    public Mensaje(Cuenta Autor, String texto) {
        this.Autor = Autor;
        this.texto = texto;
        this.fechaCreacion =  LocalDateTime.now();;
    }

    public Mensaje() {
        this.fechaCreacion = LocalDateTime.now();
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Cuenta getAutor() {
        return Autor;
    }

    public String getTexto() {
        return texto;
    }
}



