package com.DesarrolloWeb.AvengersColombia.service;

import com.DesarrolloWeb.AvengersColombia.objetos.sujetos.SuperHeroe;
import com.DesarrolloWeb.AvengersColombia.objetos.sujetos.Usuario;
import com.DesarrolloWeb.AvengersColombia.repository.SuperHeroeRepository;
import com.DesarrolloWeb.AvengersColombia.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Service
public class DefaultDataInitializerService implements CommandLineRunner {

    private final SuperHeroeRepository superHeroeRepository;
    private final UsuarioRepository usuarioRepository;

    public DefaultDataInitializerService(SuperHeroeRepository superHeroeRepository, UsuarioRepository usuarioRepository) {
        this.superHeroeRepository = superHeroeRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        // Inicializar 4 Superhéroes (si no existen ya)
        List<SuperHeroe> defaultHeroes = Arrays.asList(
                new SuperHeroe("Iron Man", "ironman@example.com", "pass123", "iron_man.jpg", "Tecnología avanzada", "Genius, multimillonario"),
                new SuperHeroe("Captain America", "cap@example.com", "pass123", "capitan.jpg", "Liderazgo", "Soldado mejorado con suero"),
                new SuperHeroe("Thor", "thor@example.com", "pass123", "thor.jpg", "Poder divino", "Dios del trueno"),
                new SuperHeroe("Hulk", "hulk@example.com", "pass123", "hulk.jpg", "Super fuerza", "Gigante verde")
        );
        defaultHeroes.forEach(hero -> {
            if (superHeroeRepository.findByEmail(hero.getEmail()) == null) {
                superHeroeRepository.save(hero);
            }
        });

        // Inicializar 4 Usuarios (si no existen ya)
        List<Usuario> defaultUsers = Arrays.asList(
                new Usuario("Usuario Uno", "user1@example.com", "pass123", "user1.jpg"),
                new Usuario("Usuario Dos", "user2@example.com", "pass123", "user2.jpg"),
                new Usuario("Usuario Tres", "user3@example.com", "pass123", "user3.jpg"),
                new Usuario("Usuario Cuatro", "user4@example.com", "pass123", "user4.jpg")
        );
        defaultUsers.forEach(user -> {
            if (usuarioRepository.findByEmail(user.getEmail()) == null) {
                usuarioRepository.save(user);
            }
        });
    }
}