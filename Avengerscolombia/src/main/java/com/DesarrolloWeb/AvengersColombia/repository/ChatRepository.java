package com.DesarrolloWeb.AvengersColombia.repository;

import com.DesarrolloWeb.AvengersColombia.objetos.chat.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> findByParticipantesId(int cuentaId);
}
