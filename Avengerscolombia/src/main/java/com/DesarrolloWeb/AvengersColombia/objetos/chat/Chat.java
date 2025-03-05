package com.DesarrolloWeb.AvengersColombia.objetos.chat;

import com.DesarrolloWeb.AvengersColombia.objetos.sujetos.Cuenta;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "chats")
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToMany(mappedBy = "chat", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Mensaje> mensajes;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "chat_participantes",
            joinColumns = @JoinColumn(name = "chat_id"),
            inverseJoinColumns = @JoinColumn(name = "cuenta_id")
    )
    @JsonIgnoreProperties({"password", "notificaciones"}) // Ignorar propiedades sensibles
    private List<Cuenta> participantes;

    @Column
    private final LocalDateTime fechaCreacion;

    public Chat() {
        this.fechaCreacion = LocalDateTime.now();
        this.mensajes = new ArrayList<>();
        this.participantes = new ArrayList<>();
    }

    public Chat(List<Mensaje> mensajes, List<Cuenta> participantes) {
        this.mensajes = mensajes != null ? mensajes : new ArrayList<>();
        this.participantes = participantes != null ? participantes : new ArrayList<>();
        this.fechaCreacion =  LocalDateTime.now();;
    }

    public void enviarMensaje(Mensaje mensaje) {
        mensajes.add(mensaje);
    }

    public List<Cuenta> obtenerParticipantes() {
        return participantes;
    }

    public List<Mensaje> recibirMensajes() {
        return mensajes;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public List<Mensaje> getMensajes() {
        return mensajes;
    }

    public void setMensajes(List<Mensaje> mensajes) {
        this.mensajes = mensajes;
    }

    public List<Cuenta> getParticipantes() {
        return participantes;
    }

    public void setParticipantes(List<Cuenta> participantes) {
        this.participantes = participantes;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void añadirParticipante(Cuenta participante) {
        participantes.add(participante);
    }
}
