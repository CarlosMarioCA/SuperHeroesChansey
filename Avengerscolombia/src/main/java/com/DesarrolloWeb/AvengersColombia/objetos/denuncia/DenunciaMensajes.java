package com.DesarrolloWeb.AvengersColombia.objetos.denuncia;

import com.DesarrolloWeb.AvengersColombia.objetos.chat.Chat;
import com.DesarrolloWeb.AvengersColombia.objetos.chat.Mensaje;
import com.DesarrolloWeb.AvengersColombia.objetos.sujetos.Cuenta;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "denuncias_mensajes")
public class DenunciaMensajes extends DenunciaObjeto {

    @ManyToOne
    @JoinColumn(name = "chat_id")
    private Chat chatR;

    @ManyToOne
    @JoinColumn(name = "mensaje_id")
    private Mensaje mensajeR;

    protected DenunciaMensajes() {
        // Constructor requerido por JPA
    }
    public DenunciaMensajes(String titulo, String descripcionDenuncia, Cuenta perfilDenunciante, Cuenta perfilDenunciado, Chat chatR, Mensaje mensajeR) {
        super(titulo, descripcionDenuncia, perfilDenunciante, perfilDenunciado);
        this.chatR = chatR;
        this.mensajeR = mensajeR;
    }
    public Chat getChatR() {
        return chatR;
    }

    public void setChatR(Chat chatR) {
        this.chatR = chatR;
    }

    public Mensaje getMensajeR() {
        return mensajeR;
    }

    public void setMensajeR(Mensaje mensajeR) {
        this.mensajeR = mensajeR;
    }
}
