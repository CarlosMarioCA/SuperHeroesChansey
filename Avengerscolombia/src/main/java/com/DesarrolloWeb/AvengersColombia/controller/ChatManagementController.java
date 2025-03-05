package com.DesarrolloWeb.AvengersColombia.controller;

import com.DesarrolloWeb.AvengersColombia.DTO.ChatDTO;
import com.DesarrolloWeb.AvengersColombia.objetos.chat.Chat;
import com.DesarrolloWeb.AvengersColombia.objetos.chat.Mensaje;
import com.DesarrolloWeb.AvengersColombia.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/chats")
@CrossOrigin(origins = "*")
public class ChatManagementController {

    @Autowired
    private ChatService chatService;

    // Obtener lista de chats para una cuenta (usuario o superhéroe)
    @GetMapping("/user/{cuentaId}")
    public ResponseEntity<List<ChatDTO>> getChatsForUser(@PathVariable int cuentaId) {
        List<Chat> chats = chatService.getAllChatsForUser(cuentaId);
        List<ChatDTO> chatDTOs = chats.stream()
                .map(ChatDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(chatDTOs);
    }

    // Enviar mensaje en un chat
    @PostMapping("/{chatId}/mensaje")
    public ResponseEntity<ChatDTO.MensajeDTO> sendMessage(@PathVariable Long chatId, @RequestBody MensajeRequest request) {
        Mensaje mensaje = chatService.sendMessage(chatId, request.getAutorId(), request.getTexto());
        return ResponseEntity.ok(new ChatDTO.MensajeDTO(mensaje));
    }

    // Eliminar un chat (expulsa a los participantes)
    @DeleteMapping("/{chatId}")
    public ResponseEntity<?> deleteChat(@PathVariable Long chatId) {
        chatService.deleteChat(chatId);
        return ResponseEntity.ok(Map.of("message", "Chat eliminado correctamente"));
    }

    public static class MensajeRequest {
        private int autorId;
        private String texto;

        // Getters y setters
        public int getAutorId() {
            return autorId;
        }

        public void setAutorId(int autorId) {
            this.autorId = autorId;
        }

        public String getTexto() {
            return texto;
        }

        public void setTexto(String texto) {
            this.texto = texto;
        }
    }
}