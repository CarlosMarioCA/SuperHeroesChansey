package com.DesarrolloWeb.AvengersColombia.DTO;
import com.DesarrolloWeb.AvengersColombia.objetos.chat.Chat;
import com.DesarrolloWeb.AvengersColombia.objetos.chat.Mensaje;
import com.DesarrolloWeb.AvengersColombia.objetos.sujetos.Cuenta;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * DTO para representar un Chat sin referencias circulares
 */
public class ChatDTO {
    private Long id;
    private List<ParticipanteDTO> participantes;
    private List<MensajeDTO> mensajes;

    public ChatDTO() {
        this.participantes = new ArrayList<>();
        this.mensajes = new ArrayList<>();
    }

    /**
     * Constructor que convierte una entidad Chat a ChatDTO
     * @param chat Entidad Chat de origen
     */
    public ChatDTO(Chat chat) {
        this.id = chat.getId();
        this.participantes = chat.getParticipantes().stream()
                .map(ParticipanteDTO::new)
                .collect(Collectors.toList());
        this.mensajes = chat.getMensajes().stream()
                .map(MensajeDTO::new)
                .collect(Collectors.toList());
    }

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<ParticipanteDTO> getParticipantes() {
        return participantes;
    }

    public void setParticipantes(List<ParticipanteDTO> participantes) {
        this.participantes = participantes;
    }

    public List<MensajeDTO> getMensajes() {
        return mensajes;
    }

    public void setMensajes(List<MensajeDTO> mensajes) {
        this.mensajes = mensajes;
    }

    /**
     * DTO para representar un participante del chat
     */
    public static class ParticipanteDTO {
        private Integer id;
        private String nombre;
        private String email;
        private String imagenPerfil;

        public ParticipanteDTO() {
        }

        public ParticipanteDTO(Cuenta cuenta) {
            this.id = cuenta.getId();
            this.nombre = cuenta.getNombre();
            this.email = cuenta.getEmail();
            this.imagenPerfil = cuenta.getImagenPerfil();
        }

        // Getters y setters
        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
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

        public String getImagenPerfil() {
            return imagenPerfil;
        }

        public void setImagenPerfil(String imagenPerfil) {
            this.imagenPerfil = imagenPerfil;
        }
    }

    /**
     * DTO para representar un mensaje del chat
     */
    public static class MensajeDTO {
        private Long id;
        private ParticipanteDTO autor;
        private String texto;
        private LocalDateTime fechaCreacion;

        public MensajeDTO() {
        }

        public MensajeDTO(Mensaje mensaje) {
            this.id = mensaje.getId();
            this.autor = new ParticipanteDTO(mensaje.getAutor());
            this.texto = mensaje.getTexto();
            this.fechaCreacion = mensaje.getFechaCreacion();
        }

        // Getters y setters
        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public ParticipanteDTO getAutor() {
            return autor;
        }

        public void setAutor(ParticipanteDTO autor) {
            this.autor = autor;
        }

        public String getTexto() {
            return texto;
        }

        public void setTexto(String texto) {
            this.texto = texto;
        }

        public LocalDateTime getFechaCreacion() {
            return fechaCreacion;
        }

        public void setFechaCreacion(LocalDateTime fechaCreacion) {
            this.fechaCreacion = fechaCreacion;
        }
    }
}
